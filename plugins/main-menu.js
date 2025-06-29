import { xpRange } from '../lib/levelling.js';

const clockString = ms => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
};

const imagen = "https://qu.ax/JRCMQ.jpg";

const menuHeader = `
╭─❒ 「 *📍 BARBOZA MD* 」
│ 👤 *Nombre:* %name
│ 🎖 *Nivel:* %level | *XP:* %exp/%max
│ 🔓 *Límite:* %limit | *Modo:* %mode
│ ⏱️ *Uptime:* %uptime
│ 🌍 *Usuarios:* %total
│ 🤖 *Bot optimizado para mejor rendimiento.*
╰❒
`.trim();

// Divisor de sección
const sectionDivider = '╰─────────────────╯';

// Pie de página del menú
const menuFooter = `
╭─❒ 「 *📌 INFO FINAL* 」
│ ⚠️ *Usa los comandos con el prefijo correspondiente.*

> Creado por 𝐀𝐧𝐠𝐞𝐥-Team
╰❒
`.trim();

let handler = async (m, { conn, usedPrefix: _p }) => { // Corrected parameter here
  try {
    const user = global.db?.data?.users?.[m.sender] || { level: 1, exp: 0, limit: 5 };
    const { exp, level, limit } = user;
    const { min, xp } = xpRange(level, global.multiplier || 1);
    const totalreg = Object.keys(global.db?.data?.users || {}).length;

    const mode = global.opts?.self ? 'Privado 🔒' : 'Público 🌐';
    const uptime = clockString(process.uptime() * 1000);

    let name = "Usuario";
    try {
      name = await conn.getName(m.sender);
    } catch {}

    let categorizedCommands = {};

    Object.values(global.plugins)
      .filter(p => p?.help && !p.disabled)
      .forEach(p => {
        const tags = Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? [p.tags] : ['Otros']);
        const tag = tags[0] || 'Otros';
        if (!Array.isArray(p.help) && typeof p.help !== 'string') return;
        const commands = Array.isArray(p.help) ? p.help : [p.help];

        categorizedCommands[tag] = categorizedCommands[tag] || new Set();
        commands.forEach(cmd => categorizedCommands[tag].add(cmd));
      });

    const emojis = {
      anime: "🎭",
      info: "ℹ️",
      search: "🔎",
      diversión: "🎉",
      subbots: "🤖",
      rpg: "🌀",
      registro: "📝",
      sticker: "🎨",
      imagen: "🖼️",
      logo: "🖌️",
      configuración: "⚙️",
      premium: "💎",
      descargas: "📥",
      herramientas: "🛠️",
      nsfw: "🔞",
      "base de datos": "📀",
      audios: "🔊",
      "free fire": "🔥",
      otros: "🪪"
    };

    const menuBody = Object.entries(categorizedCommands).map(([title, cmds]) => {
      const cleanTitle = title.toLowerCase().trim();
      const emoji = emojis[cleanTitle] || "📁";
      const entries = [...cmds].map(cmd => `│ ◦ _${_p}${cmd}_`).join('\n');
      return `╭─「 ${emoji} *${title.toUpperCase()}* 」\n${entries}\n${sectionDivider}`;
    }).join('\n\n');

    const finalHeader = menuHeader
      .replace('%name', name)
      .replace('%level', level)
      .replace('%exp', exp - min)
      .replace('%max', xp)
      .replace('%limit', limit)
      .replace('%mode', mode)
      .replace('%uptime', uptime)
      .replace('%total', totalreg);

    const fullMenu = `${finalHeader}\n\n${menuBody}\n\n${menuFooter}`;

    await conn.sendMessage(m.chat, {
      image: { url: imagen },
      caption: fullMenu,
      mentions: [m.sender]
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '⚠️ Ocurrió un error al generar el menú. Por favor, inténtalo de nuevo más tarde o contacta al soporte.', m); // Removed contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲 ',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲 ',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m }); here
  }
};
handler.command = ['menu', 'help', 'menú'];

export default handler;
