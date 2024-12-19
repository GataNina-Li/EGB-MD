import fs, { promises } from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
try {
let d = new Date(new Date + 3600000)
let locale = 'es'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = conn.getName(m.sender)
let user = global.db.data.users[m.sender]
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let menu = `
∴∴∴∴∴∴∴∴∴∴∴∴∴∴∴∴∴
@${m.sender.split("@")[0]}
๑°°°°۞°°°°°°°°۞°°°°°°°°۞°°°°๑

:･ﾟ✵ :･ﾟ✧ :･ﾟ✵ *:･ﾟ✧:･ﾟ✵ :･ﾟ✧:･ﾟ
┌──── ∘°Ξ°∘ ────┐
│ *Únete a nuestro canal de Telegram*
│ t.me/globalgb
└──── °∘Ξ∘° ────┘
:･ﾟ✵ :･ﾟ✧ :･ﾟ✵ *:･ﾟ✧:･ﾟ✵ :･ﾟ✧:･ﾟ

> ∵ Descubre más sobre este bot
\`${usedPrefix}suginfo\`

> ∵ Sugiere algo para este bot
\`${usedPrefix}opinar\`

> ∵ Promociona te gratis en canales
\`${usedPrefix}suginfinity\`
${WC.infinity.link}

\`${usedPrefix}sugpoetix\`
${WC.poetix.link}

\`${usedPrefix}suggatabot\`
${WC.gatabot.link}

> ∵ Descubre tú reputación 
\`${usedPrefix}reputacion\`

> ∵ Mira quienes están en el top
\`${usedPrefix}top\`

> ∵ Recolecta gratis puntos de reputación 
\`${usedPrefix}recolectar\`

> ∵ Intercambia Estrellas por pts. de reputación
\`${usedPrefix}trueque\`

> ∵ Beneficíate de un rol especial
\`${usedPrefix}vip\`

> ∵ (Opcional) Verificate y gana estrellas
\`${usedPrefix}verificar\`

> ∵ Conoce nuestros patrocinadores
\`${usedPrefix}patrocinadores\`

> ∵ Contacta con los que hicieron posible esto
\`${usedPrefix}creadores\`

> ∵ Ayúdanos a mejorar lo que ofrecemos
\`${usedPrefix}donar\`
_Recompesas para quienes donen, reclama tú recompensa a los creadores_

> ∵ Impulsa tus publicaciones
\`${usedPrefix}tienda\`

❪✧❫━━━━━━━━━━━━━━❪✧❫

*🤗 ¿Te gustaría colaborar con nosotros?*
_Contacta con los creadores_

_© Evolution Global Bots_
∴∴∴∴∴∴∴∴∴∴∴∴∴∴∴∴∴
 `.trim()
    
try {
await conn.sendMessage(m.chat, { image: { url: ImgRandom }, caption: menu, mentions: [m.sender], contextInfo: fakeChannel }, { quoted: fkontak })
} catch (error) {
console.log(error)
}} catch (e) {
await m.reply("Algo salió mal, intente más tarde")
console.log(e)
}}

handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|menucompleto|allmenu|allm|m|\?)$/i
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

/*await conn.sendMessage(m.chat, { video: { url: vi.getRandom() }, gifPlayback: true, caption: menu,
contextInfo: {
mentionedJid: [m.sender],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: '120363169294281316@newsletter',
newsletterName: "GB - UPDATE ✨",
serverMessageId: -1
},
forwardingScore: 999,
externalAdReply: {
title: gt,
body: wm,
thumbnailUrl: img2,
sourceUrl: md,
mediaType: 1,
renderLargerThumbnail: false
}}})*/
