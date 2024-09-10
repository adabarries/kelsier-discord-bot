import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('fortnite')
        .setDescription('made to test fortnite api calls'),
    async execute(interaction) {
        const kelsier = 'EID_ArmUpDance';
        // const kelsier = 'CID_A_100_Athena_Commando_M_Downpour_KC39P'; // real kel
        const channel = interaction.client.channels.cache.get('635935632190865480');
        const thread = channel.threads.cache.get('1208862779876966400');

         // counts the number of days elapsed since start of count.
        const daysPassed = () => { 
            let today = new Date().getTime();
            const previous = new Date('December 19, 2022 11:06:00');
            return Math.ceil((today - previous) / 86400000);
        };
        try {
            const response = await axios.get('https://fortniteapi.io/v2/shop?lang=en&includeRenderData=false&includeHiddenTabs=false', 
            { headers:{ Authorization: process.env.KEY } });
            let shop = response.data.shop;
            if (shop.some(item => item.mainId === kelsier)) {
                // yes response. @-mentions multiple people (consider making this a role in the future?)
                console.log('ID present');
                const embedSkinPresent = new EmbedBuilder()
                    .setColor('Green')
                    .setImage('https://i.imgur.com/8QtwCSc.gif')
                    .setDescription('***YEAH BABEYYYYYY***');
                await thread.send({ content: `# DAY ${daysPassed()}:`, embeds: [embedSkinPresent] });
                await thread.send(`<@!55549207372640256> <@!480855402289037312> ***LETS GO LETS GO WAKE THE FUCK UP***`);
                interaction.reply({ content: 'Sent!', ephemeral: true });
            } else {
                // no response.
                console.log('ID absent.');
                const embedSkinAbsent = new EmbedBuilder()
                    .setColor('730600')
                    .setDescription('**Nope.** <:crey:828406658526085120>');
                thread.send({ content: `# DAY ${daysPassed()}:`, embeds: [embedSkinAbsent] });
                interaction.reply({ content: 'Sent!', ephemeral: true });
            }
            } 
        catch (error) {
            console.log('Error in API call.', error);
        }
    }
};
// fortnite role: <@1051249902233063425>

// to-do:
// -make sure this works (pretty sure it does but test to confirm)
// -consider writing actual tests for these later
// -hook it up to your cron function
// -add exceptions for sable channel and politics channel
// -change variables to the actual ones present in sable server
// -add listener to dunk on falc
// -deploy 