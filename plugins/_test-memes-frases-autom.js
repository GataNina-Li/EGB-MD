import hispamemes from 'hispamemes';
import axios from 'axios';

let handler = m => m;

export async function before(m, { conn }) {

setInterval(async () => {
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
}}, 5 * 60 * 1000); //10hs

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://luminai.my.id", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: true // true = resultado con URL
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
    "Solo aquellas personas que se atreven a tener grandes fracasos terminan logrando grandes éxitos.",
    "La clave del éxito es empezar antes de estar listo.",
    "No es lo que tienes, es lo que haces con lo que tienes lo que marca la diferencia.",
    "Lo que no te mata te hace más fuerte.",
    "La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.",
    "El futuro depende de lo que hagas hoy.",
    "El mayor obstáculo para el éxito es el miedo al fracaso.",
    "No se trata de ser el mejor, se trata de ser mejor que ayer.",
    "El éxito es la habilidad de ir de fracaso en fracaso sin perder el entusiasmo.",
    "La vida no se mide por las veces que respiras, sino por los momentos que te dejan sin aliento.",
    "El primer paso para llegar a alguna parte es decidir que no vas a quedarte donde estás.",
    "Los sueños no tienen fecha de caducidad.",
    "Haz lo que puedas, con lo que tengas, donde estés.",
  "No necesitas ser grande para empezar, pero necesitas empezar para ser grande.",
    "Si puedes soñarlo, puedes lograrlo.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "El momento perfecto nunca llega, así que empieza ahora.",
    "Lo que hagas hoy puede mejorar todos tus mañanas.",
    "La diferencia entre un éxito y un fracaso es la perseverancia.",
    "No pongas límites a tus sueños, ponle acción.",
    "El éxito no tiene secretos, solo la voluntad de intentarlo.",
    "Haz de tu vida un sueño, y de tu sueño una realidad.",
    "Nunca subestimes el poder de un pequeño paso hacia tu objetivo.",
    "Cada día es una nueva oportunidad para mejorar.",
    "El éxito no es el final, el fracaso no es fatal, es el coraje para continuar lo que cuenta.",
    "La vida te da oportunidades, no excusas.",
    "No tienes que ser perfecto para ser increíble.",
    "Nunca sabrás lo fuerte que eres hasta que ser fuerte sea tu única opción.",
    "El cambio no es solo posible, es necesario.",
    "No busques el momento perfecto, haz que el momento sea perfecto.",
    "El único modo de hacer un gran trabajo es amar lo que haces.",
    "La disciplina es el puente entre las metas y los logros.",
    "La vida es 10% lo que experimentas y 90% cómo respondes a ello.",
    "Tus únicas limitaciones son las que te impones a ti mismo.",
    "La verdadera motivación es la que viene desde adentro.",
    "La vida comienza donde termina la zona de confort.",
    "El éxito no es para los que piensan en grande, es para los que actúan en grande.",
    "La perseverancia es la clave de la victoria.",
    "La motivación es lo que te pone en marcha, el hábito es lo que te mantiene.",
    "Lo que pienses, lo puedes lograr.",
    "El éxito se construye con acciones, no con excusas.",
    "La vida es como montar en bicicleta, para mantener el equilibrio, tienes que seguir adelante.",
    "Si no luchas por lo que quieres, no te quejes por lo que pierdes.",
    "El éxito es el resultado de la preparación, el esfuerzo y aprender de los fracasos.",
    "No dejes que lo que no puedes hacer interfiera con lo que puedes hacer.",
    "No dejes que el miedo decida tu futuro.",
    "La mejor forma de predecir tu futuro es crearlo.",
    "Haz lo que amas, y nunca tendrás que trabajar un solo día de tu vida.",
    "A veces, la mayor prueba de coraje es la paciencia.",
    "No te compares con los demás, compite contigo mismo.",
    "La oportunidad se encuentra en medio de los desafíos.",
  "El verdadero fracaso es no intentarlo.",
    "Hazlo con pasión o no lo hagas.",
    "El éxito no es cuestión de suerte, es cuestión de esfuerzo.",
    "Si no te desafía, no te cambiará.",
    "Nunca dejes de soñar, solo de trabajar para ello."
];  
  
}
export default handler
