import fetch from 'node-fetch'
import axios from 'axios'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
await m.reply('*Enviando contactos...*')
 
const pais = await getNationalities(official)
const biografia = await getBiographies(official, conn)

const contacts = [
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
title: 'elrebelde21',
desc: '📵 No Hacer Spam',
email: 'thelolibotm@gmail.com',
country: pais.number2 ? `${pais.number2.emoji} ${pais.number2.country}` : 'Desconocido',
github: 'https://github.com/elrebelde21', 
sky: 'https://dash.skyultraplus.com',
bio: biografia.number2
}
]

for (let contact of contacts) {
const contactArray = [[
contact.number,
contact.name,
contact.title,
contact.desc,
contact.email,
contact.country,
contact.sky || contact.github, // Dependiendo del campo disponible
contact.bio
]]
await conn.sendContactArray(m.chat, contactArray, m)
}} catch (error) {
console.error(error)
m.reply('Hubo un error al intentar enviar los contactos.')
}}
handler.command = /^(owner|contacto|creador|contactos|creadora|creadores)/i
export default handler

async function getNationalities(numbers) {
let requests = numbers.map((entry, index) => {
let phoneNumber = entry[0]
return axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${phoneNumber}`)
.then(api => {
let userNationalityData = api.data.result;
let userNationality = userNationalityData ? { country: userNationalityData.name, emoji: userNationalityData.emoji } : { country: 'Desconocido', emoji: '' }
return {
[`number${index + 1}`]: { country: userNationality.country, emoji: userNationality.emoji }
}}).catch((error) => {
console.error("Error al obtener nacionalidad:", error)
return {
[`number${index + 1}`]: { country: 'Desconocido', emoji: '' }
}})
})
let results = await Promise.all(requests)
let finalResults = Object.assign({}, ...results)
return finalResults
}

async function getBiographies(numbers, conn) {
const biographies = {}
let requests = numbers.map(async ([number], index) => {
const formattedNumber = `${number}@s.whatsapp.net`
try {
const biografia = await conn.fetchStatus(formattedNumber).catch(() => null);
if (biografia && biografia[0] && biografia[0].status !== null) {
return { [`number${index + 1}`]: biografia[0].status }
} else {
return { [`number${index + 1}`]: "Sin descripción" }
}} catch {
return { [`number${index + 1}`]: "Sin definir" }
}
})
let results = await Promise.all(requests)
results.forEach(result => {
Object.assign(biographies, result)
})
return biographies
}
