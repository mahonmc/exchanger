const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    MessageCollector
} = require("discord.js");

require('dotenv').config();

var http = require('http');

const {Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember, Channel} = Partials;

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
    partials: [User, Message, GuildMember, ThreadMember]
});

client.commands = new Collection();

http.createServer(function (req, res) { res.write("I'm alive"); res.end(); }).listen(8080);

client.login(process.env.BOT_TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
})