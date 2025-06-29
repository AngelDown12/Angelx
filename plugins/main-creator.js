async function handler(m, { conn }) {
    let numcreador = '584146277368';
    let ownerJid = numcreador + '@s.whatsapp.net';

    let name = await conn.getName(ownerJid) || 'Owner';
    let about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || 'Creador de bots de WhatsApp y del Bot 𝐀𝐧𝐠𝐞𝐥 Ai';
    let empresa = '𝐀𝐧𝐠𝐞𝐥- Servicios Tecnológicos';

    let caption = `
✨ *Información del Dueño:* ✨

*👤 Nombre:* ${name}
*📞 Número:* wa.me/${numcreador}
*📝 Descripción:* ${about}
*🏢 Empresa:* ${empresa}
*📧 Email:* sebastianbarbaro82@gmail.com
*📸 Instagram:* https://www.instagram.com/sebastian_barboza13
`;

    await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
