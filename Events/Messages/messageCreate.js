const {Client, MessageCollector} = require('discord.js');

const fs = require('fs');

module.exports = {
    name: "messageCreate",

    async execute(message) {
      let jsonInput = fs.readFileSync("config.json");

      if (!jsonInput) return console.log("NO JSON FOUND");

      let jsonData = JSON.parse(jsonInput);

      var config = jsonData;

      let channel = await config.channels;

      for (i=0; i < channel.length; i++) {
        let chnl = await config.channels;
        if (message.channel.id === chnl[i]) {
          const collectorFilter = (m) =>
          m.author.id === message.author.id;

          const messages = await message.channel.messages.fetch()
          const collected = messages.filter(collectorFilter);
          const size = collected.size;
          const slicenum = size - 1;
      
          if (collected.size > 1) {
          await message.channel.bulkDelete(collected.last(slicenum));
          continue;
          } else {
            console.log('No messages to delete.');
            continue;
          }
      } else {
          continue;
      }
      }
    }
}