/*import _ from "lodash"

let handler = async (m, { conn, command, usedPrefix, args }) => {
  const text = _.get(args, "length") ? args.join(" ") : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || ""
  if (typeof text !== 'string' || !text.trim()) return m.reply(`✦ Ingresa una consulta\n*Ejemplo:* .${command} Joji Ew`)

  await m.reply('✦ Espere un momento...')
  
let d2 = await fetch(`https://deliriussapi-oficial.vercel.app/search/spotify?q=${text}`)
  let ds = await d2.json()
const dps = await fetch(`https://deliriussapi-oficial.vercel.app/download/spotifydl?url=${ds.data[0].url}`)
  const dp = await dps.json()

  const { title = "No encontrado", type = "No encontrado", artis = "No encontrado", durasi = "No encontrado", download, image } = dp.data

  const captvid = ` *✦Título:* ${title}
 *✧Popularidad:* ${ds.data[0].popularity}
 *✦Tipo:* ${type}
 *✧Artista:* ${artis}
 *✦link:* ${text}
 `

  const spthumb = (await conn.getFile(image))?.data

  const infoReply = {
    contextInfo: {
      externalAdReply: {
        body: `✧ En unos momentos se entrega su audio`,
        mediaType: 1,
        mediaUrl: text,
        previewType: 0,
        renderLargerThumbnail: true,
        sourceUrl: text,
        thumbnail: spthumb,
        title: `S P O T I F Y - A U D I O`
      }
    }
  }

  await conn.reply(m.chat, captvid, m, infoReply)
  infoReply.contextInfo.externalAdReply.body = `Audio descargado con éxito`
  
    await conn.sendMessage(m.chat, {
      audio: { url: download },
      caption: captvid,
      mimetype: "audio/mpeg",
      contextInfo: infoReply.contextInfo
    }, { quoted: m })
}

handler.help = ["spotifyplay *<consulta>*"]
handler.tags = ["downloader"]
handler.command = /^(spotify|splay)$/i
handler.limit = true
export default handler*/

import _ from "lodash";

const BASE_API_URL = "https://deliriussapi-oficial.vercel.app";

let handler = async (m, { conn, command, args }) => {
  const text = args.length
    ? args.join(" ")
    : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || "";

  if (!text.trim()) {
    return m.reply(`✦ Ingresa una consulta\n*Ejemplo:* .${command} Joji Ew`);
  }

  try {
    await m.reply("✦ Espere un momento...");

    const searchResponse = await fetch(`${BASE_API_URL}/search/spotify?q=${encodeURIComponent(text)}`);
    if (!searchResponse.ok) throw new Error("Error en la búsqueda de Spotify");
    const searchData = await searchResponse.json();

    if (!searchData.data || !searchData.data.length) {
      return m.reply("✦ No se encontraron resultados para tu consulta.");
    }

    const downloadResponse = await fetch(`${BASE_API_URL}/download/spotifydl?url=${searchData.data[0].url}`);
    if (!downloadResponse.ok) throw new Error("Error al descargar el audio");
    const downloadData = await downloadResponse.json();

    if (!downloadData.data) {
      return m.reply("✦ No se pudo descargar el audio.");
    }

    const { title = "No encontrado", type = "No encontrado", artis = "No encontrado", download, image } = downloadData.data;

    const caption = ` *✦Título:* ${title}
 *✧Popularidad:* ${searchData.data[0].popularity}
 *✦Tipo:* ${type}
 *✧Artista:* ${artis}
 *✦link:* ${text}
 `;

    const thumbnail = (await conn.getFile(image))?.data;

    const infoReply = {
      contextInfo: {
        externalAdReply: {
          body: `✧ En unos momentos se entrega su audio`,
          mediaType: 1,
          mediaUrl: text,
          previewType: 0,
          renderLargerThumbnail: true,
          sourceUrl: text,
          thumbnail,
          title: `S P O T I F Y - A U D I O`,
        },
      },
    };

    await conn.reply(m.chat, caption, m, infoReply);

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: download },
        mimetype: "audio/mp4",
        contextInfo: infoReply.contextInfo,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    m.reply("✦ Ocurrió un error procesando tu solicitud. Inténtalo de nuevo más tarde.");
  }
};

handler.help = ["spotifyplay *<consulta>*"];
handler.tags = ["downloader"];
handler.command = /^(spotify|splay)$/i;
handler.limit = true;

export default handler;

