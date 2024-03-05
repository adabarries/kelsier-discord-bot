import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('fortnite')
        .setDescription('made to test fortnite api calls'),
    async execute(interaction) {
        const kelsier = 'CID_A_100_Athena_Commando_M_Downpour_KC39P';
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
                console.log('ID present');
                thread.send('this is the indicator for present id but no logic yet lol');
            } else {
                console.log('ID absent.');
                const embedSkinAbsent = new EmbedBuilder()
                    .setColor('730600')
                    .setTitle(`DAY ${daysPassed()}:`)
                    .setDescription('No. <:crey:828406658526085120>')
                thread.send({ embeds: [embedSkinAbsent] });
                interaction.reply({ content: 'Sent!', ephemeral: true });
            }
            } 
        catch (error) {
            console.log('Error in API call.', error);
        }
    }
};