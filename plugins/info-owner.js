import fetch from 'node-fetch'
import axios from 'axios'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {

const pais = await getNationalities(official)
const biografia = await getBiographies(official)

const contacts = [
{
number: official[0][0],
name: await conn.getName(official[0][0] + '@s.whatsapp.net'),
title: 'Gata Dios',
desc: 'Respondo cuando pueda...',
email: "centergatabot@gmail.com",
country: `${pais.number1.emoji} ${pais.number1.country}`,
github: 'https://github.com/GataNina-Li',
bio: biografia.number1
},
{
number: official[1][0],
name: await conn.getName(official[1][0] + '@s.whatsapp.net'),
title: 'Mario',
desc: '📵 No Hacer Spam',
email: null,
country: `${pais.number2.emoji} ${pais.number2.country}`,
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
await conn.sendContactArray(m.chat, contactArray, m)
 
}
handler.command = /^(owner|contacto|creador|contactos|creadora|creadores)/i
export default handler

async function getNationalities(numbers) {
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

async function getBiographies(numbers) {
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
