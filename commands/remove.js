const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: "Eliminar canción de la cola",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay cola.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Uso: ${message.client.prefix}eliminar <Número de cola>`);
    if (isNaN(args[0])) return message.reply(`Uso: ${message.client.prefix}eliminar <Número de cola>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ Removió **${song[0].title}** de la cola.`);
  }
};
