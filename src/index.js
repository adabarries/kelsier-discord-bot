import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import fs from 'node:fs';
import axios from 'axios';

config();

const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`); // Using dynamic import
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
    }
}

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = await import(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Logs in using token.
client.login(process.env.TOKEN);

// fortnite api call here
const getFortniteItemShop = async () => {
    const kelsier = 'CID_A_100_Athena_Commando_M_Downpour_KC39P';
    try {
        const res = await axios.get('https://fortniteapi.io/v2/shop?lang=en&includeRenderData=false&includeHiddenTabs=false'
        , {headers:{ Authorization: process.env.KEY } });

        return isKelsierHere(response.data.shop, kelsier);
    } catch (error) {
        console.log('Error.', error);
    }
}

// logic to determine if 'kelsier' in item shop
// if yes, fuckin blast it
// if no, just say no with a sadface. (add variations?)
const isKelsierHere = (data, id) => {
    if (data.some(item => item.mainId === id)) {
      // command logic here perhaps
      console.log('ID present.');
    } else console.log('ID absent.');
}

// be sure to specify the EXACT thread
// for reference. thread ID: 1054656000222822531 (actual. consider adding a test thread for your own server.)
// test thread ID: 1208862779876966400
// kel's ID: CID_A_100_Athena_Commando_M_Downpour_KC39P


// absolutely necessary commands:
// PRIMARY USE CASE: tells you if kelsier is back in the fortnite shop or not, 
// and does some really obnoxious pings when he is (we deserve this.)
// other nonsense: tells you if a string is a valid homestuck troll/kid name
// ???