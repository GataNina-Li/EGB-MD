const ACTIVE_CONVERSATIONS = {}; 

const ADMIN_GROUP_ID = "120363186806088548@g.us";

let handler = async (m, { conn, text, command }) => {
  if (!text && !m.quoted) return m.reply(`⚠️ Por favor, incluye un mensaje con tu reporte.`);

  let reportId = Math.floor(Math.random() * 901) // Generar ID únic
  ACTIVE_CONVERSATIONS[reportId] = {
    userId: m.sender,
    userName: m.pushName || 'Usuario desconocido',
    active: true, // Conversación activa
  };

  let reportText = m.text || (m.quoted && m.quoted.text);
  let adminMessage = `📢 *Nuevo reporte recibido*

👤 Usuario: @${m.sender.split("@")[0]}
📝 Reporte: ${reportText}

Responde al mensaje con:
*"responder ${reportId} [mensaje]"* para interactuar.
Usa *.fin ${reportId}* para finalizar la conversación.`;

  await conn.sendMessage(ADMIN_GROUP_ID, { text: adminMessage, mentions: [m.sender] }, { quoted: m });

  await conn.reply(m.chat, `✅ Tu reporte ha sido enviado a los administradores. Te responderemos pronto.`);
};

handler.before = async (response) => {
if (!response.text) return;

let matchResponder = response.text.match(/^responder (\S+) (.+)/i);
if (matchResponder) {
let [_, reportId, adminMessage] = matchResponder;

if (!ACTIVE_CONVERSATIONS[reportId] || !ACTIVE_CONVERSATIONS[reportId].active) {
return await conn.reply(response.chat, `⚠️ No se encontró ninguna conversación activa con ese ID.`, response);
}

let { userId, userName } = ACTIVE_CONVERSATIONS[reportId];
await conn.reply(userId, `💬 *Mensaje de los admins:*\n${adminMessage}`);
return;
}

let matchFin = response.text.match(/^\.fin (\S+)/i);
if (matchFin) {
let [_, reportId] = matchFin;

if (!ACTIVE_CONVERSATIONS[reportId]) return await conn.reply(response.chat, `⚠️ No se encontró ninguna conversación activa con ese ID.`, response);

let { userId, userName } = ACTIVE_CONVERSATIONS[reportId];
ACTIVE_CONVERSATIONS[reportId].active = false; // Cerrar la conversación
await conn.reply(userId, `🔒 *La conversación ha sido cerrada por los administradores.*`);
await conn.reply(response.chat, `✔️ Conversación ${reportId} cerrada.`);
return;
}
};
handler.command = /^(report|reporte)$/i;

export default handler;
