import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`⚠️ Ingrese el número BIN\n\n*🔐 Algunos BIN disponibles:*\n• ${usedPrefix + command} 539083\n• ${usedPrefix + command} 464622\n• ${usedPrefix + command} 464625\n• ${usedPrefix + command} 464627`);
m.react("💎")
try {
const url = `https://venomweb.site/apisfree/tipo/bin?query=${text}`;
const response = await axios.get(url);
const data = response.data?.data;

if (!data) throw new Error('Datos no disponibles');

const binInfo = `🔐 *Bin:* ${data.bin || 'N/A'}
• *País:* ${data.pais || 'N/A'}
• *Tipo:* ${data.tipo || 'N/A'}
• *Nivel:* ${data.nivel || 'N/A'}
• *Banco:* ${data.banco || 'N/A'}
• *Tarjeta:* ${data.bandeira || 'N/A'}
• *Temporal:* ${data.tempo_resposta || 'N/A'}
> ${data.code || 'Código desconocido'}`;

m.reply(binInfo);
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al consultar la API. Inténtalo más tarde.');
    }
};

handler.help = ['bin'];
handler.tags = ['tools'];
handler.command = /^(bin)/i;
//handler.register = true;
//handler.limit = 1;
export default handler;
