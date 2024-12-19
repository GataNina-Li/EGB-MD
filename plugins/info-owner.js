import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  const contacts = global.official.filter(([_, __, status]) => status === 1);
  const lista = [];
  
  for (const contact of contacts) {
    const [number, name, status] = contact;
    const jid = `${number}@s.whatsapp.net`;
    const displayName = await conn.getName(jid);
    const biografia = await conn.fetchStatus(jid).catch(() => null);
    const bio = biografia?.status || "Sin descripción";
    lista.push({ number, name: displayName || name || "Desconocido", bio });
  }

  let vcards = lista.map(({ number, name, bio }) => (
    `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nORG:${name}\nTITLE:\nTEL;waid=${number}:${number}\nX-ABLabel:${bio}\nEND:VCARD`
  )).join("\n");

  const vcardList = { 
    contacts: lista.map(({ number, name, bio }) => ({
      displayName: name,
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nORG:${name}\nTITLE:\nTEL;waid=${number}:${number}\nX-ABLabel:${bio}\nEND:VCARD`
    }))
  };

  let cat = `💖🐈 𝘾𝙊𝙉𝙏𝘼𝘾𝙏𝙊 | 𝘾𝙊𝙉𝙏𝘼𝘾𝙏 💖🐈 

*---------------------*

*CENTER GATABOT*
*centergatabot@gmail.com*

𝙂𝘼𝙏𝘼 𝘿𝙄𝙊𝙎 - 𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝘾𝙄𝘼
*${asistencia}*

*---------------------*

ᵃ ᶜᵒⁿᵗᶦⁿᵘᵃᶜᶦᵒ́ⁿ ˢᵉ ᵉⁿᵛᶦᵃʳᵃⁿ ˡᵒˢ ᶜᵒⁿᵗᵃᶜᵗᵒˢ ᵈᵉ ᵐᶦ ᵖʳᵒᵖᶦᵉᵗᵃʳᶦᵒ / ᵈᵉˢᵃʳʳᵒˡˡᵃᵈᵒʳᵉˢ`;

  await conn.sendMessage(m.chat, { text: cat, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: wm, containsAutoReply: true, mediaType: 1, thumbnail: imagenRandom, sourceUrl: accounts }
  }}, { quoted: fkontak });

  await conn.sendMessage(m.chat, { 
    contacts: vcardList.contacts 
  }, { quoted: m });
};

handler.help = ['owner', 'creator', 'creador', 'dueño', 'fgowner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño', 'fgowner'];

export default handler;
