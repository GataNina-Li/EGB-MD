import { webp2png } from '../lib/webp2mp4.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text && !m.quoted) return m.reply('*⚠️ Ingrese el mensaje o archivo a enviar*');

  let media = false;
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  let url = '';
  
  if (/image|video/.test(mime)) {
    media = await q.download();
    if (/video/.test(mime)) {
      url = await uploadFile(media);
    } else {
      url = await uploadImage(media);
    }
  }
  else if (/webp/.test(mime)) {
    media = await q.download();
  }

  if (/webp/.test(mime) && media) {
await conn.sendFile("120363160031023229@newsletter", media, 'sticker.webp', '', null, null, fake, { asSticker: true });
  } else if (url && /image/.test(mime)) {
    await conn.sendMessage("120363160031023229@newsletter", { image: { url }, caption: text || '' }, { quoted: null });
  } else if (url && /video/.test(mime)) {
    await conn.sendMessage("120363160031023229@newsletter", { video: { url }, caption: text || '' }, { quoted: null });
  } else if (text) {
    await conn.sendMessage("120363160031023229@newsletter", { text: text }, { quoted: null })}
await m.reply(`✅ Mensaje enviado.`);
};
handler.command = /^(mensajeoficial)$/i;
handler.owner = true;

export default handler;
