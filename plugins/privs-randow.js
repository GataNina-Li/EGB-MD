import hispamemes from 'hispamemes';
import axios from 'axios';

let handler = async (m, {command, conn}) => {
const fake2 = { contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: "😂 Meme 😂", body: "¡Disfruta de un buen meme! 🎉", mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnailUrl: "https://qu.ax/nWgle.jpg", sourceUrl: [canal1, yt].getRandom()}}}  
let CANAL_ID = "120363374372683775@newsletter";

const url = await hispamemes.meme();
let or = ['memes', 'piropo', 'frases'];
let media = pickRandom(or);

if (media === 'memes') {
await conn.sendFile(CANAL_ID, url, 'error.jpg', '', m, null, fake2);
}

if (media === 'piropo') {
let query = 'Cuéntame un piropo, solo di el piropo no agregues más texto.';
let username = m.sender;
let logic = "piropo"; 
let result;
try {
result = await luminsesi(query, username, logic);
if (!result || result.trim() === "") throw new Error("Respuesta vacía");
} catch (error) {
result = pickRandom(global.piropo); 
}

await conn.sendMessage(CANAL_ID, { text: `${result}`, contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: "❤️ Piropo", 
body: "🌹 Una palabra bonita para ti 💕",
"previewType": "PHOTO",
thumbnailUrl: "https://qu.ax/nWgle.jpg", 
sourceUrl: pickRandom([canal1, canal2, yt2])}}}, { quoted: null})
}

if (media === 'frases') {
let query = 'Dime una frase inspiradora o motivacional.';
let username = m.sender;
let logic = "frase inspiradora"; 
let result;
try {
result = await luminsesi(query, username, logic);
if (!result || result.trim() === "") throw new Error("Respuesta vacía");
} catch (error) {
result = pickRandom(global.frases); 
}

await conn.sendMessage(CANAL_ID, { text: `✨ ${result} ✨`, contextInfo:{ 
forwardingScore: 9999999, 
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: "💬 Frase del día", 
body: "✨ Inspiración para hoy 🌟",
"previewType": "PHOTO",
thumbnailUrl: "https://qu.ax/nWgle.jpg", 
sourceUrl: pickRandom([canal1, canal2, yt2])}}}, { quoted: null})
}
};
handler.help = ['random']; 
handler.tags = ['random'];
handler.command = /^(test40)$/i; 
handler.owner = true

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

async function luminsesi(q, username, logic) {
    try {
        const response = await axios.post("https://luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: true // true = resultado con url
        });
        return response.data.result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

global.piropo = ["Me gustaría ser papel para poder envolver ese bombón.", "Eres como wifi sin contraseña, todo el mundo te busca", "Quién fuera bus para andar por las curvas de tu corazón.", "Quiero volar sin alas y salir de este universo, entrar en el tuyo y amarte en silencio.", "Quisiera ser mantequilla para derretirme en tu arepa.", "Si la belleza fuera pecado vos ya estarías en el infierno.", "Me Gustaría Ser Un Gato Para Pasar 7 Vidas A Tu Lado.", "Robar Está Mal Pero Un Beso De Tu Boca Sí Me Lo Robaría.", "Qué Hermoso Es El Cielo Cuando Está Claro Pero Más Hermoso Es El Amor Cuando Te Tengo A Mi Lado.", "Bonita, Camina Por La Sombra, El Sol Derrite Los Chocolates.", "Si Fuera Un Correo Electrónico Serías Mi Contraseña.", "Quisiera que fueses monte para darte machete", "Perdí mi número de teléfono ¿Me das el tuyo?", "¿Cómo te llamas para pedirte de regalo a Santa Claus?", " En el cielo hay muchas estrellas, pero la más brillante está en la Tierra y eres tú.", "¿Acaba de salir el sol o es la sonrisa que me regalas hoy?", "No es el ron ni la cerveza, eres tú quien se me ha subido a la cabeza", "Si hablamos de matemáticas eres la suma de todos mis deseos.", "Pareces Google porque tienes todo lo que yo busco.", "Mi café favorito, es el de tus ojos.", "Quiero ser photoshop para retocarte todo el cuerpo.", "Quisiera que fueras cereal, para cucharearte en las mañanas.", "Quien fuera hambre, para darte tres veces al día."]

global.frases = [
    "La vida es un 10% lo que te sucede y un 90% cómo reaccionas ante ello.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "Cada día es una nueva oportunidad para cambiar tu vida.",
    "Lo único imposible es aquello que no intentas.",
    "No se trata de cuántas veces caes, sino de cuántas veces te levantas.",
    "El único límite para lograr lo imposible es nuestra propia mente.",
    "El futuro pertenece a aquellos que creen en la belleza de sus sueños.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.",
    "La diferencia entre lo ordinario y lo extraordinario es ese pequeño extra.",
    "Haz hoy lo que otros no quieren, haz mañana lo que otros no pueden.",
    "No te rindas, cada fracaso es una lección para el éxito.",
    "Nunca es tarde para perseguir tus sueños.",
    "La vida es corta, sonríe mientras tengas dientes.",
    "La mente es todo. Lo que piensas, te conviertes.",
    "La mejor manera de predecir el futuro es crearlo.",
    "Tienes dos vidas, y la segunda empieza cuando te das cuenta de que solo tienes una.",
    "El verdadero éxito es ser feliz con lo que eres y lo que tienes.",
    "No cuentes los días, haz que los días cuenten.",
    "Cuando lo quieras, tendrás que luchar por ello. No te rindas.",
    "El mayor riesgo es no tomar ningún riesgo.",
    "Solo aquellas personas que se atreven a tener grandes fracasos terminan logrando grandes éxitos."
];
