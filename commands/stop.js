const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "stop",
  description: "Detiene la musica",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("No hay nada jugando.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ detuvo la música!`).catch(console.error);
  }
};
