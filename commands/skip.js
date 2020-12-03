const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Omitir la canción que se está reproduciendo actualmente",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("No hay nada reproduciendo, puedes saltar.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ se saltó la canción`).catch(console.error);
  }
};
