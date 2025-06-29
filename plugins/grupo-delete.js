let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `✍️ Responde al mensaje que deseas eliminar.`, m, contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲 ',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲 ',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m });)
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
} catch {
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}}

handler.help = ['delete']
handler.tags = ['grupo']
handler.command = ['del','delete']
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler