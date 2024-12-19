let handler = async (m, { conn, text, usedPrefix, command }) => {

const topics = [
{ number: 1, topic: "📝 Comandos disponibles" },
{ number: 2, topic: "📢 Canales donde puedo enviar contenido" },
{ number: 3, topic: "💬 Explicación sobre mi reputación" },
{ number: 4, topic: "📤 Qué puedo enviar a los canales" },
{ number: 5, topic: "⭐ Para qué sirven las estrellas y cómo usarlas" },
{ number: 6, topic: "⏳ Cómo reducir el tiempo de espera para enviar algo en un canal" },
{ number: 7, topic: "❌ Cómo eliminar mi tiempo de espera" },
{ number: 8, topic: "⚠️ Qué pasa si mi reputación es mala" },
{ number: 9, topic: "🚀 Cómo mejoro mi reputación" },
{ number: 10, topic: "👑 Cómo ser usuario VIP" },
{ number: 11, topic: "🔒 Por qué este bot tiene permitido enviar contenido a los canales" },
{ number: 12, topic: "🤝 Qué colaboradores participan" },
{ number: 13, topic: "🧑‍💻 Cómo puedo saber más información mía en este bot" },
{ number: 14, topic: "🤖 Para qué sirve este bot" },
{ number: 15, topic: "🪅 Este bot fue creado a partir de cuál base" },
{ number: 16, topic: "🤨 Solicité revisión para enviar mensaje a un canal, me lo aprobaron pero no se ve en el canal" }
]

if (!text) {
let topicsList = topics.map(topic => `\`\`\`[ ${topic.number} ]\`\`\` *${topic.topic}*`).join("\n")
return m.reply(`*Por favor, selecciona un tema escribiendo el número correspondiente:*\n\n\`Temas disponibles:\`\n${topicsList}\n\n*Ejemplo:*\n${usedPrefix + command} 3`)
}

if (text) {
switch (text) {
case '1':
return m.reply(`📜 Para ver todos los comandos disponibles, visita el menú principal utilizando el comando *#menu*.`)

case '2':
let result = ''
Object.entries(global.WC).forEach(([key, channel]) => {
result += `*${channel.name}* \`(${usedPrefix}${channel.command})\`\n_${channel.link}_\n\n`
})
return m.reply(`*Aquí tienes una lista de canales donde puedes enviar tu contenido con previa revisión. Utiliza el comando correspondiente para publicar tú contenido:*\n\n${result}`)

case '3':
return m.reply(`Tu reputación es un marcador dentro del bot que refleja tu nivel de actividad y la calidad de tu participación. Todos los usuarios comienzan con una puntuación de cero, y pueden ganar puntos cuando solicitan que su contenido sea publicado en un canal, siempre y cuando la revisión de su solicitud sea aprobada.
\nEs importante tener en cuenta que tu reputación puede subir o bajar, pero no te preocupes. Aunque tengas una "mala reputación", seguirás teniendo la posibilidad de solicitar que se publique contenido en los canales. La reputación no es un obstáculo, sino una forma de premiar tu participación activa.
\nEl propósito principal de la reputación es reducir el tiempo de espera entre las solicitudes de publicación en los canales. Cuanto mejor sea tu reputación, menor será el tiempo que tendrás que esperar entre cada solicitud.
\nSi quieres saber como mejorar tú reputación usa el comando *${usedPrefix + command} 9*
\nSi deseas saber cuál es tú reputación actual, usa el comando *${usedPrefix}reputacion*
\nObten puntos de reputación gratis usando el comando *${usedPrefix}recolectar*`)

case '4':
return m.reply(`*Aunque el contenido que solicitas para publicar en los canales pasa por un filtro que requiere aprobación o rechazo*, te ofrecemos un enlace oficial donde podrás consultar las políticas de contenido permitidas y prohibidas por WhatsApp. Te invitamos a ingresar y familiarizarte con estas normativas. Ten en cuenta que, si solicitas la publicación de contenido inapropiado, corres el riesgo de que tu solicitud sea rechazada y, en el peor de los casos, podrías ser baneado del bot.\n\n_whatsapp.com/legal/channels-guidelines_`)

case '5':
return m.reply(`✨ *Las estrellas que obtienes son una forma de dar fama a los usuarios.* Cada vez que una de tus publicaciones sea aprobada, recibirás estrellas, sin importar en qué canal las hayas solicitado. 🌟
\n🏅 Estas estrellas también pueden ser canjeadas por puntos de reputación, pero ten en cuenta que si las usas, tu cantidad de estrellas disminuirá. Esto significa que podrías dejar de formar parte del *${usedPrefix}top* de usuarios cuyos contenidos han sido aprobados. 📉
\n¡Así que aprovecha las estrellas para destacar en el top o mejorar tu reputación! 🚀
\nConoce los canles disponibles que permiten solicitar que se envíe contenido con el comando *${usedPrefix + command} 2*
\nIntercambia estrellas ⭐ por puntos de reputación 👾 usando el comando *${usedPrefix}trueque*`)

default:
return m.reply(`⚠️ *Opción no válida.*\n\nPor favor, elige un número entre 1 y 14 para obtener información sobre cada tema.`)
}}

}
handler.command = /^(suggestion|propuesta|feedback|idea|contenido|sug|suggest|suginfo)$/i
export default handler
