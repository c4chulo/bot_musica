const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Alternar la eliminación de mensajes de bot",
  execute(message) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Hubo un error al escribir en el archivo..").catch(console.error);
      }

      return message.channel
        .send(`La poda de mensajes es ${config.PRUNING ? "**enabled**" : "**disabled**"}`)
        .catch(console.error);
    });
  }
};
