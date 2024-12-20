//Código echo por: https://github.com/elrebelde21 

import { webp2png } from '../lib/webp2mp4.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import axios from 'axios'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let suggestionQueue = {}
const MAX_VIDEO_SIZE_MB = 40 // Límite de 40MB X videos

// tiempo de espera según la reputación
const reputationTimes = [
{ reputation: 0, time: 4 * 60 * 60 * 1000 }, // 4 horas
{ reputation: 2, time: 3 * 60 * 60 * 1000 }, // 3 horas
{ reputation: 5, time: 2 * 60 * 60 * 1000 }, // 2 horas
{ reputation: 10, time: 30 * 60 * 1000 },    // 30 minutos
{ reputation: 15, time: 15 * 60 * 1000 },    // 15 minutos
{ reputation: 20, time: 10 * 60 * 1000 },    // 10 minutos
{ reputation: 25, time: 5 * 60 * 1000 },     // 5 minutos
{ reputation: 30, time: 1 * 60 * 1000 }      // 1 minuto
]

const ADMIN_GROUP_ID = "120363317570465699@g.us"
const CANAL_ID = WC.infinity.id
const CANAL_LINK = WC.infinity.link
const LEYENDA = `Este proceso es para enviar tú contenido al canal *${WC.infinity.name}*\n\n> Si deseas enviar tu contenido a otro canal usa el comando *#menu*`
    
let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender)
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => img5)
let users = global.db.data.users[m.sender]
     
let waitTime = getWaitTime(users.reputation) // Obtiene el tiempo de espera según la reputación del usuario
let time = users.suggetimme + waitTime
if (new Date() - users.suggetimme < waitTime) return m.reply(`⚠️ *Ya has enviado una publicación.*\n\nPor favor, espera *${msToTime(time - new Date())}* antes de enviar otra publicación.\n\nSi deseas reducir o eliminar el tiempo de espera, puedes mejorar tu reputación usando el comando *${usedPrefix}reputacion* ¡Tu reputación influye en tu tiempo de espera!\n\n${LEYENDA}`)

if (!text && !m.quoted) return m.reply(`*⚠️ Por favor, escribe tu sugerencia, pregunta, propuesta o envía un archivo multimedia.* 📝\n\n> *Elige una categoría de las siguientes opciones:*\n\n1. Sugerencia 💡\n2. Propuesta 📝\n3. Publicidad 📢\n4. Opinión 💬\n5. Feedback 🤔\n6. Pregunta ❓\n7. Error 🚨\n8. Queja 😐\n9. Música 🎵\n10. Eventos 🎉\n11. Películas 🍿\n12. Juegos 🎮\n13. Tecnología 🤖\n14. Diseño 🎨\n15. Desarrollo de software 💻\n16. Humor 😂\n17. Soporte técnico 🤝\n18. Frases ✨\n19. Contenido creativo 📸\n20. Educación 📚\n21. Salud y bienestar 🏥\n22. Viajes ✈️\n23. Fotografía 📷\n24. Moda 👗\n25. Arte 🎨\n26. Cultura 🎭\n27. Negocios 💼\n28. Ciencia 🔬\n29. Naturaleza 🌿\n30. Deportes ⚽\n31. Meme 😆\n\n> *Ejemplo:* ${usedPrefix + command} 1 Texto\n\n${LEYENDA}`)

let media = false
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
let url = ''

if (/image|video/.test(mime)) {
media = await q.download()

if (/video/.test(mime)) {
let videoPath = join(__dirname, `./temp_video_${new Date().getTime()}.mp4`)
fs.writeFileSync(videoPath, media)

let videoStats = fs.statSync(videoPath)
let videoSizeMB = videoStats.size / (1024 * 1024)

if (videoSizeMB > MAX_VIDEO_SIZE_MB) {
fs.unlinkSync(videoPath)
return m.reply(`*⚠️ El video excede el tamaño permitido (max 40 MB). Por favor, recórtalo, comprime o envía uno más ligero.*\n\n${LEYENDA}`)
}
url = videoPath
} else {
url = await uploadImage(media)
}} else if (/webp/.test(mime)) {
media = await q.download()
url = await webp2png(media)
}

let [categoryChoice, ...rest] = text.split(' ')
let suggestionText = rest.join(' ')
if (!suggestionText && !media) return m.reply(`*⚠️ Por favor, agrega un texto o archivo multimedia después de seleccionar la categoría.*\n  
*Ejemplo:*\n*${usedPrefix + command} 1 Mi sugerencia es...*\n\n${LEYENDA}`)

let categories = {
  '1': 'sugerencia',
  '2': 'propuesta',
  '3': 'publicidad',
  '4': 'opinión',
  '5': 'feedback',
  '6': 'pregunta',
  '7': 'error',
  '8': 'queja',
  '9': 'música',
  '10': 'eventos',
  '11': 'películas',
  '12': 'juegos',
  '13': 'tecnología',
  '14': 'diseño',
  '15': 'desarrollo de software',
  '16': 'humor',
  '17': 'soporte técnico',
  '18': 'frases',
  '19': 'contenido creativo',
  '20': 'educación',
  '21': 'salud y bienestar',
  '22': 'viajes',
  '23': 'fotografía',
  '24': 'moda',
  '25': 'arte',
  '26': 'cultura',
  '27': 'negocios',
  '28': 'ciencia',
  '29': 'naturaleza',
  '30': 'deportes',
  '31': 'meme'
}

let category = categories[categoryChoice]
if (!category) return m.reply(`*⚠️ Opción inválida.*\n\nPor favor, elige una categoría válida: 1, 2, 3 o 4. Revisa las opciones disponibles usando el comando *${usedPrefix + command}*\n\n${LEYENDA}`)

await m.reply(`✅ *Tu publicación ha sido enviada a los administradores para su revisión.*\n
📌 *Proceso de revisión:*
- Si la revisión es exitosa, recibirás un mensaje positivo y lo solicitado será publicado en el canal.  
- Si la revisión no es exitosa, recibirás un mensaje negativo y, opcionalmente, los administradores podrán informarte la razón del rechazo.\n
🔄 *Si no es aprobada:* 
Puedes realizar una nueva solicitud sin recibir sanción. Sin embargo, si el contenido es vulgar u obsceno, es posible que pierdas el acceso a este servicio en el futuro.\n
> \`Tiempo estimado de la revisión de 5 min hasta 10 horas. Sea paciente por favor.\`\n\n${LEYENDA}`)


let groupMetadata = await conn.groupMetadata(ADMIN_GROUP_ID)
let groupAdmins = groupMetadata.participants.filter(p => p.admin)

if (!groupAdmins || groupAdmins.length === 0) {
return 
}

let suggestionId = Math.floor(Math.random() * 901)
suggestionQueue[suggestionId] = { suggestionText, category, sender: m.sender, senderName: m.pushName, pp, suggestionId, url, mime, usedPrefix }
global.db.data.users[m.sender].suggetimme = new Date * 1

let confirmMessage = `📢 El usuario @${m.sender.split('@')[0]} ha enviado una publicación para su revisión.  

📝 *Categoría:* ${category.charAt(0).toUpperCase() + category.slice(1)}  
📄 *Contenido:* ${suggestionText || 'Sin texto'}  

🔍 *Opciones de revisión:*  
- Escribe *"si ${suggestionId}"* para aprobar la publicación.  
- Escribe *"no ${suggestionId} [motivo]"* para rechazarla indicando el motivo. (Motivo opcional).  

🔔 Si se rechaza la publicación, el motivo será enviado de forma anónima al usuario que solicitó la revisión.  

📋 *Ejemplo de rechazo:*  
_"no ${suggestionId} Tu publicación contiene [motivo específico], por favor corrige y vuelve a solicitar una revisión."_  

> 📌 *ID de la publicación:* ${suggestionId}`


if (url) {
if (/image/.test(mime)) {
await conn.sendMessage(ADMIN_GROUP_ID, { image: { url }, caption: confirmMessage, contextInfo:{ mentionedJid:[m.sender]}}, { quoted: m })
} else if (/video/.test(mime)) {
await conn.sendMessage(ADMIN_GROUP_ID, { video: { url }, caption: confirmMessage, contextInfo:{ mentionedJid:[m.sender]}}, { quoted: m })        
}} else {
await conn.sendMessage(ADMIN_GROUP_ID, {text: confirmMessage, mentions: [m.sender]}, {quoted: m })
}}

handler.before = async (response) => {
if (!response.text || !response.text.match(/^(si|no)\s*(\d+)?/i)) return

let groupMetadata = await conn.groupMetadata(ADMIN_GROUP_ID)
let groupAdmins = groupMetadata.participants.filter(p => p.admin)
const isAdmin = groupAdmins.some(admin => admin.id === response.sender)
if (!isAdmin) return

let matches = response.text.match(/^(si|no)\s*(\d+)?/i)
let action = matches[1].toLowerCase()
let suggestionId = matches[2] 

let matches_motivo = response.text.match(/^(si|no)\s*(\d+)?\s*(.*)?/i)
let reason_motivo = matches_motivo[3]?.trim() || "Los administradores no dejaron un motivo específico"
console.log(response.text)
console.log('texto: ' + matches_motivo[3]?.trim())
    
if (!suggestionId || !suggestionQueue[suggestionId]) {
return
}

const { suggestionText, category, sender, senderName, pp, url, mime, usedPrefix } = suggestionQueue[suggestionId]
let users = global.db.data.users[response.sender]

if (action === 'no') {
if (users.reputation > 0) {
users.reputation -= 1
} else {
users.reputation = 0
}
await conn.sendMessage(ADMIN_GROUP_ID, { react: { text: "❌", key: response.key } })
await conn.reply(sender, `⚠️ *Tu publicación ha sido rechazada por los administradores.*\n\n📌 *Motivo del rechazo:* ${reason_motivo.charAt(0).toUpperCase() + reason_motivo.slice(1)}\n\n_Si el motivo no es claro, te invitamos a enviar un nuevo mensaje o contenido_`, null, { mentions: [sender] })
delete suggestionQueue[suggestionId]
return
}

if (action === 'si') {
users.reputation += 1
await conn.sendMessage(ADMIN_GROUP_ID, { react: { text: "✅", key: response.key } })
let approvedText = `${suggestionText ? `📝 *${category.charAt(0).toUpperCase() + category.slice(1)}:* ${suggestionText || 'Sin descripción'}` : ''}\n\n_¡Envia mensaje a este canal!_\nWa.me/${conn.user.jid.split('@')[0]}?text=${usedPrefix}menu`
let title, body

switch (category) {
case 'sugerencia':
case 'propuesta':
case 'opinión':
case 'feedback':
title = `【 🔔 ¡Nueva ${category.charAt(0).toUpperCase() + category.slice(1)}! 🔔 】`
body = `🌟 ¡Nueva ${category.charAt(0).toUpperCase() + category.slice(1)} enviada por un usuario! 🌟`
break

case 'error':
case 'queja':
title = `【 ⚠️ ¡Nueva queja o reporte de error! ⚠️ 】`
body = `🔧 ¡Un usuario ha enviado un reporte de error o queja! 🔧`
break

case 'música':
case 'eventos':
title = `【 🎵 ¡Nuevo ${category.charAt(0).toUpperCase() + category.slice(1)}! 🎵 】`
body = `¡Un usuario ha sugerido un eventos interesantes!`
break

case 'películas':
case 'juegos':
title = `【 🎬 ¡Nueva sugerencia de entretenimiento! 🎮 】`
body = `🎥 ¡Un usuario compartió ideas sobre ${category.charAt(0).toUpperCase() + category.slice(1)}! 🎮`
break

case 'humor':
case 'meme':
case 'broma':
title = `【 😜 ¡Nueva ${category.charAt(0).toUpperCase() + category.slice(1)}! 😂 】`
body = `🤣 ¡Un usuario compartió algo divertido! ¡Échale un vistazo! 🤣`
break

case 'frases':
case 'frase':
title = `【 ✍️ ¡Nueva frase inspiradora! 】`
body = `💬 Un usuario compartió una frase interesante. ¡No te la pierdas!`
break

case 'tecnología':
case 'diseño':
case 'desarrollo de software':
title = `【 💻 ¡Nuevo aporte en ${category.charAt(0).toUpperCase() + category.slice(1)}! 💻 】`
body = `💡 ¡Un usuario envió una idea sobre ${category.charAt(0).toUpperCase() + category.slice(1)}! 💡`
break

case 'soporte técnico':
title = `【 🛠️ ¡Solicitud de soporte técnico! 】`
body = `📞 ¡Un usuario necesita ayuda con soporte técnico!`
break

case 'educación':
title = `【 🎓 ¡Nueva idea educativa! 】`
body = `📚 ¡Un usuario compartió algo sobre educación y aprendizaje!`
break

case 'salud y bienestar':
title = `【 💖 ¡Nueva publicación de bienestar! 】`
body = `🌿 ¡Un usuario envió algo relacionado con salud y bienestar!`
break

case 'viajes':
title = `【 ✈️ ¡Nueva publicación de viajes! 】`
body = `🌍 ¡Un usuario compartió ideas sobre viajes y aventuras!`
break

case 'fotografía':
title = `【 📸 ¡Nueva publicación fotográfica! 】`
body = `📷 ¡Un usuario compartió algo visualmente impresionante!`
break

case 'moda':
title = `【 🪄 ¡Nueva idea de moda! 】`
body = `✨ ¡Un usuario envió algo sobre tendencias de moda!`
break

case 'arte':
case 'cultura':
title = `【 🎨 ¡Nuevo aporte cultural o artístico! 】`
body = `🖌️ ¡Un usuario compartió algo relacionado con arte o cultura!`
break

case 'negocios':
title = `【 💼 ¡Nueva idea de negocios! 】`
body = `📈 ¡Un usuario envió algo relacionado con negocios o emprendimiento!`
break

case 'ciencia':
title = `【 🔬 ¡Nueva publicación científica! 】`
body = `🧪 ¡Un usuario compartió algo interesante sobre ciencia!`
break

case 'naturaleza':
title = `【 🌿 ¡Nueva publicación de naturaleza! 】`
body = `🌳 ¡Un usuario envió algo relacionado con la naturaleza y el medio ambiente!`
break

case 'deportes':
title = `【 ⚽ ¡Nueva publicación deportiva! 】`
body = `🏅 ¡Un usuario compartió algo sobre deportes o actividades físicas!`
break

default:
title = `【 🔔 ¡Nuevo aporte! 🔔 】`;
body = `🌟 ¡Un usuario ha enviado un nuevo aporte! 🌟`
break
}

let options = { contextInfo: { externalAdReply: {
title: title, 
body: body,
thumbnailUrl: pp, 
sourceUrl: accounts,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}

if (url && /image/.test(mime)) {
await conn.sendMessage(CANAL_ID, { image: { url }, caption: approvedText, contextInfo: options.contextInfo }, { quoted: null });
} else if (url && /video/.test(mime)) {
await conn.sendMessage(CANAL_ID, { video: { url }, caption: approvedText, contextInfo: options.contextInfo }, { quoted: null });
fs.unlinkSync(url)  
} else {
await conn.sendMessage(CANAL_ID, { text: approvedText, contextInfo: options.contextInfo }, { quoted: null })
}
await conn.reply(sender, `✅ *¡Tu publicación ha sido aprobada por los administradores!* 🎉\n\n\`Puedes verla en el siguiente canal:\`\n${CANAL_LINK}\n\n¡Gracias por contribuir, sigue publicando es gratis! 🙌`, null, { mentions: [sender] })

delete suggestionQueue[suggestionId]
return
}}
handler.command = /^(suginfinity)$/i

export default handler

function msToTime(duration) {
let seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
days = Math.floor(duration / (1000 * 60 * 60 * 24))
let timeParts = []

if (days > 0) timeParts.push(`${days} día${days > 1 ? 's' : ''}`)
if (hours > 0) timeParts.push(`${hours} hora${hours > 1 ? 's' : ''}`)
if (minutes > 0) timeParts.push(`${minutes} minuto${minutes > 1 ? 's' : ''}`)
if (seconds > 0) timeParts.push(`${seconds} segundo${seconds > 1 ? 's' : ''}`)

return timeParts.join(', ')
}

function getWaitTime(reputation) {
let waitTime = reputationTimes.find(r => r.reputation >= reputation)
if (waitTime) {
return waitTime.time
} else if (reputation > 30) {
// Si la reputación es mayor a 30, asignar un tiempo de espera de 1 minuto
return 1 * 60 * 1000
} else {
// Si no hay coincidencia, asigna el tiempo (24 horas)
return 86400000 // 24 horas en milisegundos
}}
