import fetch from 'node-fetch'
import moment from 'moment-timezone'
import axios from 'axios'
import fs from 'fs'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto }  = (await import(global.baileys))

let handler = m => m
handler.before = async function (m, { conn } ) {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
let pp = await this.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/33bed21a0eaa789852c30.jpg")
  
// redes
global.tk = 'https://www.tiktok.com/@gata_dios'
global.ths = 'https://www.threads.net/@gata_dios'
global.yt = 'https://youtube.com/@gatadios'
global.yt2 = 'https://youtu.be/Ko019wvu2Tc'
global.ig = 'https://www.instagram.com/gata_dios'
global.md = 'https://github.com/GataNina-Li'
global.fb = 'https://www.facebook.com/groups/872989990425789'
global.paypal = 'https://paypal.me/OficialGD'
global.asistencia = 'https://wa.me/message/MEKOUFBEOG5ED1'
global.tg = 'https://t.me/globalgb' // canal

// canales
global.canal1 = "https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A"
global.canal2 = "https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A"
global.canal3 = "https://whatsapp.com/channel/0029VaKn22pDJ6GwY61Ftn15"
global.canal4 = "https://whatsapp.com/channel/0029VabS4KD8KMqeVXXmkG1D"
global.canal5 = "https://whatsapp.com/channel/0029VatPwXw7Noa8n1Vinx3g"

// Imágenes en la nube
global.img = 'https://qu.ax/ZNrwt.jpeg'
global.img2 = 'https://qu.ax/Kvbf.jpg'
global.img3 = 'https://qu.ax/sQfSS.jpg'
global.img4 = 'https://qu.ax/fCVpY.jpg'
global.img5 = 'https://qu.ax/nWgle.jpg'

global.ImgRandom = [img, img2, img3, img4, img5].getRandom()
//global.imagenRandom = [imagen1, imagen2, imagen3].getRandom()
global.accounts = [canal1, canal2, canal3, canal4, canal5, tk, ig, yt, paypal, fb, ths, md, asistencia, tg].getRandom()

global.canalIdGB = ["120363160031023229@newsletter", "120363169294281316@newsletter", "120363203805910750@newsletter", "120363302472386010@newsletter", "120363374372683775@newsletter", "120363336642332098@newsletter", "120363190430436554@newsletter"]
global.canalNombreGB = ["INFINITY-WA 💫", "GB - UPDATE 🐈", "Tips sobre GataBot 🤩", "NEW PROJECT: YartexBot-MD ✨", "🌹 Pσҽƚιx ✨ Sƚҽʅʅαɾ 😎 Fυɳ", "GataBot Test", "༻🅖🅔🅝ⓑⓛ༺"]
global.channelRD = await getRandomChannel()
  
global.WC = {
infinity: { name: "INFINITY-WA 💫", id: "120363160031023229@newsletter", link: "https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A", command: "suginfinity" },
poetix: { name: "🌹 Pσҽƚιx ✨ Sƚҽʅʅαɾ 😎 Fυɳ", id: "120363374372683775@newsletter", link: "https://whatsapp.com/channel/0029VayNseN2phHUJygRvH3H", command: "sugpoetix" },
gatabot: { name: "GataBot Test", id: "120363336642332098@newsletter", link: "https://whatsapp.com/channel/0029VatPwXw7Noa8n1Vinx3g", command: "suggatabot" }
}

global.fakeChannel = { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.nombre, serverMessageId: -1 }, forwardingScore: 1, externalAdReply: { title: "Bot personalizado by GataNina-Li", body: "Evolution Global Bots", thumbnailUrl: pp, sourceUrl: accounts, mediaType: 1, renderLargerThumbnail: false }}
global.fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

}
export default handler

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdGB.length)
let id = canalIdGB[randomIndex]
let nombre = canalNombreGB[randomIndex]
return { id, nombre }
} 	
