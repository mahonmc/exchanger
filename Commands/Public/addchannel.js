const {SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionFlagsBits} = require('discord.js');
const fs = require('fs');

let jsonInput = fs.readFileSync('config.json');

if (!jsonInput) return console.log("NO JSON FOUND");

let jsonData = JSON.parse(jsonInput);

var config = jsonData;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_channel")
    .setDescription("Add Channel Command")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("the channel")
        .setRequired(true)
    ),
  async execute(interaction) {
    let channel = await interaction.options.getChannel("channel").id;

    config.channels.push(String(channel));

    var json = JSON.stringify(config);

    fs.writeFileSync("config.json", json);

    interaction.reply({ content: "Channel Updated !!" });
  },
};
