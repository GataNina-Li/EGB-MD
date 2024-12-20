/*import fetch from 'node-fetch'

var handler = async (m, { conn, usedPrefix, text, args, command }) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => '')
let name = await conn.getName(who)
let biografia = await conn.fetchStatus('5217294888993' +'@s.whatsapp.net').catch(_ => 'Sin Biografía')
let biografiaBot = await conn.fetchStatus('5214531287294' +'@s.whatsapp.net').catch(_ => 'Sin Biografía')
let bio = biografia.status?.toString() || 'Sin Biografía'
let biobot = biografiaBot.status?.toString() || 'Sin Biografía'

await conn.sendContactArray(m.chat, [
['5214434703586', `${await conn.getName('5214434703586'+'@s.whatsapp.net')}`, `🍭 Creador`, 'ggg', 'gggg', `🇲🇽 México`, `https://www.youtube.com/@Azami_YT`, bio],
[`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🍧 CuriosityBot-MD`, `📵 No Hacer Spam`, 'ffffff', `🇲🇽 México`, `https://github.com/AzamiJs/CuriosityBot-MD`, biobot]
], m)
  
}
handler.help = ['owner', 'contacto', 'creador', 'contactos']
handler.tags = ['info']
handler.command = /^(owner|contacto|creador|contactos)/i

//handler.register = true

export default handler*/

import fetch from 'node-fetch'
import axios from 'axios'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
m.reply('*Espere un momento...*')
 
const pais = await getNationalities(official)
const biografia = await getBiographies(official, conn)

await conn.sendContactArray(m.chat, [
[official[0][0], 
await conn.getName(official[0][0] + '@s.whatsapp.net'), 
'Gata Dios', 
'Respondo cuando pueda...', 
"centergatabot@gmail.com", 
pais.number1 ? `${pais.number1.emoji} ${pais.number1.country}` : 'Desconocido', 
'https://github.com/GataNina-Li', 
biografia.number1
],
[official[1][0], 
await conn.getName(official[1][0] + '@s.whatsapp.net'), 
'Mario',
`📵 No Hacer Spam`, 
null,
pais.number2 ? `${pais.number2.emoji} ${pais.number2.country}` : 'Desconocido', 
'https://dash.skyultraplus.com', 
biografia.number2]
], m)

/*const contacts = [
{
number: official[0][0],
name: await conn.getName(official[0][0] + '@s.whatsapp.net'),
title: 'Gata Dios',
desc: 'Respondo cuando pueda...',
email: "centergatabot@gmail.com",
country: pais.number1 ? `${pais.number1.emoji} ${pais.number1.country}` : 'Desconocido',
github: 'https://github.com/GataNina-Li',
bio: biografia.number1
},
{
number: official[1][0],
name: await conn.getName(official[1][0] + '@s.whatsapp.net'),
title: 'Mario',
desc: '📵 No Hacer Spam',
email: null,
country: pais.number2 ? `${pais.number2.emoji} ${pais.number2.country}` : 'Desconocido',
sky: 'https://dash.skyultraplus.com',
bio: biografia.number2
}
]

const contactArray = contacts.map(contact => [
contact.number,
contact.name,
contact.title,
contact.desc,
contact.email,
contact.country,
contact.sky || contact.github, // Dependiendo del campo disponible
contact.bio
])
await conn.sendContactArray(m.chat, contactArray, m)*/
} catch (error) {
console.error(error)
m.reply('Hubo un error al intentar enviar los contactos.')
}}
handler.command = /^(owner|contacto|creador|contactos|creadora|creadores)/i
export default handler

/*async function getNationalities(numbers) {
let requests = numbers.map((entry, index) => {
let phone = PhoneNumber(entry[0])
return axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${phone.getNumber('international')}`)
.then(api => {
let userNationalityData = api.data.result;
let userNationality = userNationalityData ? {
country: userNationalityData.name,
emoji: userNationalityData.emoji
} : { country: 'Desconocido', emoji: '' }

return {
[`number${index + 1}`]: {
country: userNationality.country,
emoji: userNationality.emoji
}}
}).catch(() => {
// Manejo de errores si la API falla
return {
[`number${index + 1}`]: {
country: 'Desconocido',
emoji: ''
}
}})
})
let results = await Promise.all(requests)
let finalResults = Object.assign({}, ...results)
return finalResults
}

async function getBiographies(numbers, conn) {
const biographies = {}

for (const [index, [number, name]] of numbers.entries()) {
try {
const user = number
const biografia = await conn.fetchStatus(user).catch(() => null)
let bio = "Ninguna"

if (biografia && biografia[0] && biografia[0].status !== null) {
bio = biografia[0].status || "Sin definir"
}
biographies[`number${index + 1}`] = bio
} catch (error) {
biographies[`number${index + 1}`] = "Sin definir"
}}
return biographies
}
*/

async function getNationalities(numbers) {
  let requests = numbers.map((entry, index) => {
    let phone = PhoneNumber(entry[0])

    // Validar que el número de teléfono sea válido antes de realizar la solicitud
    const phoneNumber = phone.getNumber('international');
    console.log(phoneNumber)

    return axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${phoneNumber}`)
      .then(api => {
        let userNationalityData = api.data.result;
        let userNationality = userNationalityData ? {
          country: userNationalityData.name,
          emoji: userNationalityData.emoji
        } : { country: 'Desconocido', emoji: '' };

        return {
          [`number${index + 1}`]: {
            country: userNationality.country,
            emoji: userNationality.emoji
          }
        };
      }).catch((error) => {
        console.error("Error al obtener nacionalidad:", error);
        return {
          [`number${index + 1}`]: {
            country: 'Desconocido',
            emoji: ''
          }
        };
      });
  });

  let results = await Promise.all(requests);
  let finalResults = Object.assign({}, ...results);
  return finalResults;
}

async function getBiographies(numbers, conn) {
  const biographies = {};

  
  let requests = numbers.map(async ([number]) => {
    try {
      const biografia = await conn.fetchStatus(number).catch(() => null);
      let bio = "Ninguna";
      if (biografia && biografia[0] && biografia[0].status !== null) {
        bio = biografia[0].status || "Sin definir";
      }
      return bio;
    } catch (error) {
      return "Sin definir";
    }
  });

 
  let results = await Promise.all(requests);
  
  
  results.forEach((bio, index) => {
    biographies[`number${index + 1}`] = bio;
  });

  return biographies;
}
