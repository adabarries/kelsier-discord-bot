import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import fs from 'node:fs';

config();

const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const { default:command } = await import(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
    }
}

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = await import(`./events/${file}`).then(
        (module) => module.default || module,
    );

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Logs in using token.
client.login(process.env.TOKEN);

// absolutely necessary commands:
// PRIMARY USE CASE: tells you if kelsier is back in the fortnite shop or not, 
// and does some really obnoxious pings when he is (we deserve this.)
// other nonsense: tells you if a string is a valid homestuck troll/kid name
// ???