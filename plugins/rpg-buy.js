const xpperlimit = 450
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buycoins/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    global.db.data.users[m.sender].exp -= xpperlimit * count
    global.db.data.users[m.sender].limit += count
    conn.reply(m.chat, `╭────═[ *R P G  -  B U Y* ]═─────⋆
│╭───────────────···
││✯ *Compra* : + ${count} ❇️ Estrellas 
││✯ *Costo* : -${xpperlimit * count} 💫 XP
│╰────────────────···
╰───────────═┅═──────────`, m, contextInfo: {
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
  } else conn.reply(m.chat, `🚩 Lo siento, no tienes suficientes *⭐ XP* para comprar *${count} ❇️ Estrellas.*`, m, contextInfo: {
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
}
handler.help = ['buycoins', 'buyall']
handler.tags = ['fun']
handler.command = ['buycoins', 'buyall', 'buy'] 
handler.register = true 

export default handler