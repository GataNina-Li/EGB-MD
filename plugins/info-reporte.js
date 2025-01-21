import { webp2png } from '../lib/webp2mp4.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import axios from 'axios';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ADMIN_GROUP_ID = "120363186806088548@g.us";
const ACTIVE_CONVERSATIONS = {};
const MAX_VIDEO_SIZE_MB = 60; // Límite de 60MB para videos

let handler = async (m, { conn, text, command }) => {
    let media = false;
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    let url = '';

    if (/image|video|audio/.test(mime)) {
        media = await q.download();

        if (/video/.test(mime)) {
            let videoPath = join(__dirname, `./temp_video_${new Date().getTime()}.mp4`);
            fs.writeFileSync(videoPath, media);

            let videoStats = fs.statSync(videoPath);
            let videoSizeMB = videoStats.size / (1024 * 1024);

            if (videoSizeMB > MAX_VIDEO_SIZE_MB) {
                fs.unlinkSync(videoPath);
                return m.reply(`*⚠️ El video excede el tamaño permitido (max 60 MB). Por favor, recórtalo, comprime o envía uno más ligero.*`);
            }
            url = videoPath;
        } else {
            url = await uploadImage(media);
        }
    } else if (/webp/.test(mime)) {
        media = await q.download();
        url = await webp2png(media);
    }

    let activeConversation = Object.entries(ACTIVE_CONVERSATIONS).find(([id, convo]) => convo.active && convo.userId === m.sender && convo.chatId === m.chat);

    if (activeConversation) {
        let [reportId] = activeConversation;
        let message = `📩 *Mensaje del usuario @${m.sender.split("@")[0]} (ID: ${reportId}):*\n${text || ''}`;

        if (url) {
            if (/image/.test(mime)) {
                await conn.sendMessage(ADMIN_GROUP_ID, { image: { url }, caption: message, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m });
            } else if (/video/.test(mime)) {
                await conn.sendMessage(ADMIN_GROUP_ID, { video: { url }, caption: message, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m });
            } else if (/audio/.test(mime)) {
                await conn.sendMessage(ADMIN_GROUP_ID, { audio: { url }, mimetype: mime, caption: message, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m });
            }
        } else if (m.msg && m.msg.sticker) {
            await conn.sendMessage(ADMIN_GROUP_ID, { sticker: media, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m });
        } else {
            await conn.sendMessage(ADMIN_GROUP_ID, { text: message, mentions: [m.sender] }, { quoted: m });
        }
        return;
    }

    if (command === 'report' || command === 'reporte') {
        if (!text && !m.quoted) return m.reply(`⚠️ Por favor, incluye un mensaje con tu reporte.`);

        let reportId = Math.floor(Math.random() * 901);

        ACTIVE_CONVERSATIONS[reportId] = {
            userId: m.sender,
            userName: m.pushName || 'Usuario desconocido',
            active: true,
            chatId: m.chat,
            url: url,
            mime: mime,
        };

        let reportText = text || (m.quoted && m.quoted.text) || 'Sin mensaje';
        let ownerMessage = `NUEVO REPORTE DE USUARIO Wa.me/${m.sender.split("@")[0]}\nMENSAJE: ${reportText}\n\n> Responde al mensaje con: *"responder ${reportId} [mensaje]"* para interactuar.\n> Usa *".fin ${reportId}"* para finalizar la conversación.`;

        await conn.sendMessage(ADMIN_GROUP_ID, { text: ownerMessage, mentions: [m.sender] }, { quoted: m });
        await conn.reply(m.chat, `*El reporte ha sido enviado. El propietario responderá pronto.*`);
        return;
    }
};

handler.before = async (m, { conn }) => {
    let activeConversation = Object.entries(ACTIVE_CONVERSATIONS).find(([id, convo]) => convo.active && convo.userId === m.sender && convo.chatId === m.chat);

    if (activeConversation) {
        let [reportId] = activeConversation;
        let message2 = `📩 *Respuesta del usuario @${m.sender.split("@")[0]} (ID: ${reportId}):*\n${m.text || ''}`;

        // Enviar mensajes multimedia o texto al propietario
        if (m.mtype === 'stickerMessage') {
            let sticker = await m.download();
            if (sticker) {
                await conn.sendMessage(ADMIN_GROUP_ID, { sticker }, { quoted: m });
            } else {
                console.error('Error: No se pudo descargar el sticker.');
            }
        } else if (m.mtype === 'imageMessage' || m.mtype === 'videoMessage' || m.mtype === 'audioMessage') {
            let media = await m.download();
            let url = await uploadImage(media);
            if (url) {
                await conn.sendMessage(ADMIN_GROUP_ID, { [m.mtype === 'videoMessage' ? 'video' : m.mtype === 'audioMessage' ? 'audio' : 'image']: { url }, caption: message2 }, { quoted: m });
            } else {
                console.error('Error: No se pudo subir el medio.');
            }
        } else {
            await conn.sendMessage(ADMIN_GROUP_ID, { text: message2, mentions: [m.sender] }, { quoted: m });
        }
    }

    // Propietario responde con "responder id texto"
        let matchResponder = m.text.match(/^responder (\S+) (.+)/i);
    if (matchResponder) {
        let [_, reportId, ownerMessage] = matchResponder;

        if (!ACTIVE_CONVERSATIONS[reportId] || !ACTIVE_CONVERSATIONS[reportId].active) {
            return await conn.reply(m.chat, `⚠️ No se encontró ninguna conversación activa con ese ID.`, m);
        }

        let { userId } = ACTIVE_CONVERSATIONS[reportId];

        // Soporte para multimedia
        if (m.quoted) {
            let quoted = m.quoted;
            let mime = (quoted.msg || quoted).mimetype || '';

            if (/image|video|audio|sticker/.test(mime)) {
                let media = await quoted.download();
                let url = await uploadImage(media);

                if (/image/.test(mime)) {
                    await conn.sendMessage(userId, { image: { url }, caption: ownerMessage });
                } else if (/video/.test(mime)) {
                    await conn.sendMessage(userId, { video: { url }, caption: ownerMessage });
                } else if (/audio/.test(mime)) {
                    await conn.sendMessage(userId, { audio: { url }, mimetype: mime, caption: ownerMessage });
                } else if (/sticker/.test(mime)) {
                    await conn.sendMessage(userId, { sticker: media });
                }
            } else {
                await conn.sendMessage(userId, { text: ownerMessage });
            }
        } else {
            await conn.sendMessage(userId, { text: `💬 *Respuesta del propietario:*\n${ownerMessage}` });
        }
        return;
    }

    // 2. Propietario responde citando un mensaje
    if (m.quoted && m.quoted.text) {
        let quotedTextMatch = m.quoted.text.match(/ID: (\d+)/);
        if (quotedTextMatch) {
            let reportId = quotedTextMatch[1];
            if (ACTIVE_CONVERSATIONS[reportId] && ACTIVE_CONVERSATIONS[reportId].active) {
                let { userId } = ACTIVE_CONVERSATIONS[reportId];
                let ownerMessage = m.text || 'Sin mensaje';

                if (/image|video|audio|sticker/.test(m.mtype)) {
                    let media = await m.download();
                    let url = await uploadImage(media);

                    if (/image/.test(m.mtype)) {
                        await conn.sendMessage(userId, { image: { url }, caption: ownerMessage });
                    } else if (/video/.test(m.mtype)) {
                        await conn.sendMessage(userId, { video: { url }, caption: ownerMessage });
                    } else if (/audio/.test(m.mtype)) {
                        await conn.sendMessage(userId, { audio: { url }, mimetype: m.mimetype });
                    } else if (/sticker/.test(m.mtype)) {
                        await conn.sendMessage(userId, { sticker: media });
                    }
                } else {
                    await conn.sendMessage(userId, { text: `💬 *Respuesta del propietario:*\n${ownerMessage}` });
                }
                return;
            }
        }
    }

    // Comando ".fin id" para finalizar conversación
    let matchFin = m.text.match(/^\.fin (\S+)/i);
    if (matchFin) {
        let [_, reportId] = matchFin;

        if (!ACTIVE_CONVERSATIONS[reportId]) {
            return await conn.reply(m.chat, `⚠️ No se encontró ninguna conversación activa con ese ID.`, m);
        }

        let { userId } = ACTIVE_CONVERSATIONS[reportId];
        ACTIVE_CONVERSATIONS[reportId].active = false;
        await conn.reply(userId, `🔒 *La conversación ha sido cerrada por el propietario.*`);
        await conn.reply(m.chat, `✔️ Conversación ${reportId} cerrada.`);
        return;
    }
};

handler.command = /^(report|reporte)$/i;

export default handler;


