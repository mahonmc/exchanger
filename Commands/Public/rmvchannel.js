const {SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionFlagsBits} = require('discord.js');
const fs = require('fs');

let jsonInput = fs.readFileSync('config.json');

if (!jsonInput) return console.log("NO JSON FOUND");

let jsonData = JSON.parse(jsonInput);

var config = jsonData;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rmv_channel")
    .setDescription("Remove Channel Command")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("the channel")
        .setRequired(true)
    ),
  async execute(interaction) {
    let channel = await interaction.options.getChannel("channel").id;

    const newData = {channels: jsonData.channels.filter((e) => e !== String(channel))};

    fs.writeFileSync("config.json", JSON.stringify(newData));

    interaction.reply({ content: "Channel Removed !!" });
  },
};
