import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { fs } from 'node:fs';
import { path } from 'node:path';
import { axios } from 'axios';

config();

const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Sets a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] the command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Logs in using token.
client.login(process.env.TOKEN);

const readyClient = () => {
    console.log('Client is ready. User tag: ' + client.user.tag);
};

// Run once when client is ready.
client.once(Events.ClientReady, readyClient);

// async function handleInteraction(interaction) {
//     if (!interaction.isCommand()) return;
//     if (interaction.commandName === 'choochoo') {
//         await choochoo.execute(interaction);
//     }
// }

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


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
    console.log(interaction);
});
// client.on(Events.InteractionCreate, handleInteraction);

