const ACTIVE_CONVERSATIONS = {};
const ADMIN_GROUP_ID = "120363186806088548@g.us";

let handler = async (m, { conn, text, command }) => {
let activeConversation = Object.entries(ACTIVE_CONVERSATIONS).find(([id, convo]) => convo.active && convo.userId === m.sender );

if (activeConversation) {
let [reportId, conversation] = activeConversation;

await conn.sendMessage(ADMIN_GROUP_ID, { text: `📩 *Mensaje del usuario @${m.sender.split("@")[0]} (ID: ${reportId}):*\n\n${text}`, mentions: [m.sender] }, { quoted: m } );
return; 
}

if (command === 'report' || command === 'reporte') {
if (!text && !m.quoted) return m.reply(`⚠️ Por favor, incluye un mensaje con tu reporte.`);

let reportId = Math.floor(Math.random() * 901);

ACTIVE_CONVERSATIONS[reportId] = { 
userId: m.sender,
userName: m.pushName || 'Usuario desconocido',
active: true,
};

let reportText = text || (m.quoted && m.quoted.text);
let adminMessage = `📢 *Nuevo reporte recibido*\n\n👤 Usuario: @${m.sender.split("@")[0]}\n📝 Reporte: ${reportText}\n\nResponde al mensaje con:\n*"responder ${reportId} [mensaje]"* para interactuar.\nUsa *.fin ${reportId}* para finalizar la conversación.`;

await conn.sendMessage(ADMIN_GROUP_ID, { text: adminMessage, mentions: [m.sender] }, { quoted: m });
await conn.reply(m.chat, `✅ Tu reporte ha sido enviado a los administradores. Te responderemos pronto.`);
return;
}
};

handler.before = async (m, { conn }) => {
let activeConversation = Object.entries(ACTIVE_CONVERSATIONS).find(([id, convo]) => convo.active && convo.userId === m.sender );

if (activeConversation && m.text) {
let [reportId] = activeConversation;

await conn.sendMessage(ADMIN_GROUP_ID, {text: `📩 *Mensaje del usuario @${m.sender.split("@")[0]} (ID: ${reportId}):*\n${m.text}`, mentions: [m.sender]}, { quoted: m });
return false; 
}

let matchResponder = m.text.match(/^responder (\S+) (.+)/i);
if (matchResponder) {
let [_, reportId, adminMessage] = matchResponder;

if (!ACTIVE_CONVERSATIONS[reportId] || !ACTIVE_CONVERSATIONS[reportId].active) return await conn.reply(m.chat, `⚠️ No se encontró ninguna conversación activa con ese ID.`, m);

let { userId } = ACTIVE_CONVERSATIONS[reportId];
await conn.reply(userId, `💬 *Mensaje de los admins:*\n${adminMessage}`);
return;
}

let matchFin = m.text.match(/^\.fin (\S+)/i);
if (matchFin) {
let [_, reportId] = matchFin;
if (!ACTIVE_CONVERSATIONS[reportId]) return await conn.reply(m.chat, `⚠️ No se encontró ninguna conversación activa con ese ID.`, m);

let { userId } = ACTIVE_CONVERSATIONS[reportId];
ACTIVE_CONVERSATIONS[reportId].active = false;
await conn.reply(userId, `🔒 *La conversación ha sido cerrada por los administradores.*`);
await conn.reply(m.chat, `✔️ Conversación ${reportId} cerrada.`);
return;
}
};

handler.command = /^(report|reporte)$/i;

export default handler;
