import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) return conn.reply(m.chat, '🚩 *¡Estos comandos están desactivados!*', m, fake);
  if (!text) return conn.reply(m.chat, 'Ingresa el texto de lo que quieres buscar en Xvideo 🤍', m, contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲 ',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲 ',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m }););
  await m.react('🕓');
  try {
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
      return imageMessage;
    }

    let push = [];
    const apiUrl = `https://dark-core-api.vercel.app/api/search/xvideo?key=user1&text=${encodeURIComponent(text)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al realizar la búsqueda: ${response.status} - ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.success || !json.results || json.results.length === 0) {
      throw new Error('No se encontraron resultados');
    }

    for (let video of json.results) {
      let image = await createImage(video.videoImageSrc);

      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `◦ *Título:* ${video.videoTitle}\n◦ *Resolución:* ${video.videoResolution}\n◦ *Duración:* ${video.videoDuration}\n◦ *Enlace:* ${video.videoLink}`,
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: '' // Se puede agregar texto personalizado si lo necesitas
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: image,
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              "name": "cta_copy",
              "buttonParamsJson": `{"display_text":"🎬 Ver Video","id":"123456789","copy_code":"/xvideo ${video.videoLink}"}`
            },
          ]
        }),
      });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `*Resultados de búsqueda para:* ${text}` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Powered by Dark Team' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] }),
          })
        }
      }
    }, {
      quoted: m
    });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideosearch'];
handler.command = ['xvideosearch', 'xvideosearch'];
handler.register = true;

export default handler;