let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`⚠️ ESCRIBA SUS SUGGESTION, EJ: ${usedPrefix + command} textp`) 
if (text.length < 8) throw `*⚠️ MINIMO 10 CARACTERES PARA HACER LA SOLICITUD*`
if (text.length > 1000) throw `⚠️ *MAXIMO 1000 CARACTERES PARA HACER LA SOLICTUD.*`
let teks = `💌 \`\`\`SUGGESTION\`\`\` 💌
*⎔ Número:*
*» Wa.me/${m.sender.split`@`[0]}

*⎔ Mensaje:*
» ${text}`
m.reply(`⚡ Sus suggest ha sido enviadas a nuestros staff....`) 
await delay(1000)
conn.reply('120363186806088548@g.us', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender] }})
}
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['main']
handler.command = /^(request|reporte|bugs|bug|report-owner|solicitar)$/i 
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
