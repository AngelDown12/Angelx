//Para Usuarios De Likee 🙃
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '🚩 Ingrese la url de un video de *Likee*.', m, contextInfo: {
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
await m.react('🕓')
try {
let app = await fetch(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${text}`, { headers: { 'Content-Type': 'application/json' }})
let json = await app.json()
let video = json.links['no watermark']
await conn.sendFile(m.chat, video, 'samu.mp4', `*✔️🍟Downloader likee.*`, m)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['likee *<url>*']
handler.tags = ['dl']
handler.command = /^(likee)$/i
handler.register = true
export default handler