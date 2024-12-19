import fetch from 'node-fetch';

let handler = async (m, { conn }) => {

  if (!global.official || !Array.isArray(global.official) || global.official.length === 0) {
    return m.reply('No se han definido contactos oficiales.');
  }

  const lista = [];

  for (const contact of global.official) {
    try {
      const [number, name, status] = contact;
      if (status !== 1) continue; 

      const jid = `${number}@s.whatsapp.net`;
      const displayName = await conn.getName(jid).catch(() => name || "Desconocido");
      const biografia = await conn.fetchStatus(jid).catch(() => null);
      const bio = biografia?.status || "Sin descripción";

      lista.push({ number, name: displayName, bio });
    } catch (err) {
      console.error(`Error procesando el contacto ${contact}:`, err);
    }
  }

  if (lista.length === 0) {
    return m.reply('No hay contactos disponibles para mostrar.');
  }

  const vcardList = lista.map(({ number, name, bio }) => ({
    displayName: name,
    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nORG:${name}\nTITLE:\nTEL;waid=${number}:${number}\nX-ABLabel:${bio}\nEND:VCARD`,
  }));

  const cat = `
💖🐈 𝘾𝙊𝙉𝙏𝘼𝘾𝙏𝙊 | 𝘾𝙊𝙉𝙏𝘼𝘾𝙏 💖🐈 

*---------------------*

*CENTER GATABOT*
*centergatabot@gmail.com*

ᵃ ᶜᵒⁿᵗᶦᵘᵃᶜᶦᵒ́ⁿ ˢᵉ ᵉⁿᵛᶦᵃʳᵃⁿ ˡᵒˢ ᶜᵒⁿᵗᵃᶜᵗᵒˢ ᵈᵉ ˡᵒˢ ᵖʳᵒᵖᶦᵉᵗᵃʳᶦᵒˢ / ᵈᵉˢᵃʳʳᵒˡˡᵃᵈᵒʳᵉˢ
`;

  conn.sendMessage(m.chat, { text: cat, contextInfo: { forwardedNewsletterMessageInfo: { newsletterJid: canalIdGB, serverMessageId: canalNombreGB, newsletterName: wm }, forwardingScore: 9999999, isForwarded: true,    externalAdReply: { showAdAttribution: true,   renderLargerThumbnail: true, title: wm,   containsAutoReply: true, mediaType: 1,   thumbnail: imagenRandom, sourceUrl: accounts }}}, { quoted: fkontak });

  await conn.sendMessage(m.chat, { contacts: vcardList }, { quoted: m });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
