import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import { en, es, id, ar, pt, de, it } from './lib/idiomas/total-idiomas.js'

// ES ➜ Agregué primero el número del Bot como prioridad
// ES ➜ Si desea recibir reportes debe de usar los tres parámetros (Número, nombre y true)
// EN ➜ Add the Bot number as priority first
// EN ➜ If you want to receive reports you must use the three parameters (Number, name and true)
global.owner = [ 
['593968263524', 'Gata Dios', true],
['5492266613038'], 
['595976126756'],
['593968585383']]

global.mods = [] 
global.prems = []
global.mods = [] 

// Cambiar a false para usar el Bot desde el mismo numero del Bot.
global.isBaileysFail = true
global.baileys = '@whiskeysockets/baileys'

global.packname = '© Evolution Global Bots'
global.author = 'Gata Dios'

// ❰❰ methodCode ❱❱
// [ES] > Agregue el número del Bot en "botNumberCode" si desea recibir código de 8 dígitos sin registrar el número en la consola.
// [EN] > Add the Bot number in "botNumberCode" if you want to receive 8-digit code without registering the number in the console.
global.botNumberCode = "" //example: "+59309090909"
global.confirmCode = "" // No tocar esto : Do not touch this line

// ES ➜ Agregue el código de idioma el cual usará GataBot  
// EN ➜ Add the language code which GataBot will use
//  es = Español      id = Bahasa Indonesia       ar = عرب
//  en = English      pt = Português              de = Deutsch
//  it = Italiano
global.lenguajeGB = es  //<-- Predeterminado en idioma Español 

// ES ➜ Está parte es para mostrar el contacto de alguien al usar #contacto
// EN ➜ This part is to display someone's contact using #contact
global.official = [ 
['593968263524', 'Gata Dios 💻', 1], 
['5214774444444', '𝗗𝗲𝘀𝗮𝗿𝗿𝗼𝗹𝗹𝗮𝗱𝗼𝗿 𝗢𝗳𝗶𝗰𝗶𝗮𝗹 💻', 1]] 

global.multiplier = 60 // Cuanto más alto, más difícil subir de nivel

// IDs de canales
global.ch = {
ch1: '120363336642332098@newsletter',
ch2: '120363160031023229@newsletter',
ch3: '120363169294281316@newsletter',
ch4: '120363203805910750@newsletter',
ch5: '120363302472386010@newsletter',
ch6: '120363301598733462@newsletter',
ch7: '120363190430436554@newsletter',
ch8: '120363374372683775@newsletter', 
}

// redes
global.tk = 'https://www.tiktok.com/@gata_dios'
global.ths = 'https://www.threads.net/@gata_dios'
global.yt = 'https://youtube.com/@gatadios'
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

global.canalIdGB = ["120363160031023229@newsletter", "120363169294281316@newsletter", "120363203805910750@newsletter", "120363302472386010@newsletter", "120363374372683775@newsletter", "120363336642332098@newsletter", "120363190430436554@newsletter"]
global.canalNombreGB = ["INFINITY-WA 💫", "GB - UPDATE 🐈", "Tips sobre GataBot 🤩", "NEW PROJECT: YartexBot-MD ✨", "🌹 Pσҽƚιx ✨ Sƚҽʅʅαɾ 😎 Fυɳ", "GataBot Test", "༻🅖🅔🅝ⓑⓛ༺"]
  
global.WC = {
infinity: { name: "INFINITY-WA 💫", id: "120363160031023229@newsletter", link: "https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A", command: "suginfinity" },
poetix: { name: "🌹 Pσҽƚιx ✨ Sƚҽʅʅαɾ 😎 Fυɳ", id: "120363374372683775@newsletter", link: "https://whatsapp.com/channel/0029VayNseN2phHUJygRvH3H", command: "sugpoetix" },
gatabot: { name: "GataBot Test", id: "120363336642332098@newsletter", link: "https://whatsapp.com/channel/0029VatPwXw7Noa8n1Vinx3g", command: "suggatabot" }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.bold.greenBright(lenguajeGB['smsConfigBot']().trim()))
import(`${file}?update=${Date.now()}`)
})
