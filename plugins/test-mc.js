const handler = async (m, { conn, text, args }) => {
    if (!text) throw '.vcorreo <correo electrónico>'
    
    try {
        // Validar formato del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
            return m.reply('❌ Por favor, ingrese un correo electrónico válido.');
        }

        // Consultar a dash.name.com
        const response = await fetch('https://dash.skyultraplus.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: text
            })
        });

        const data = await response.json();
        
        if (data.success) {
            // Usuario verificado
            await conn.reply(m.chat, `✅ Usuario verificado. ¡Bienvenido a OwlPilot!\n\nDisfrute de su estancia en nuestro hosting.`, m);
        } else {
            // Usuario no encontrado
            await conn.reply(m.chat, '❌ No existe usuario registrado con este correo electrónico.', m);
        }
        
    } catch (e) {
        console.error(e);
        await m.reply('❌ Error al verificar el usuario. Por favor, intente nuevamente más tarde.');
    }
}

handler.help = ['.vcorreo <correo>']
handler.tags = ['verificación']
handler.command = /^(vcorreo)$/i

export default handler
