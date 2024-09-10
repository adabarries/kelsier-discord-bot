import { EmbedBuilder, Events } from "discord.js";
import axios from 'axios';
import cron from 'node-cron';

export default {
    name: Events.ClientReady,
    once: false,
    async execute (client) {
        cron.schedule('0 5 0 * * *', async () => { // scheduled to run at 0:05:00 every day
            console.log('running scheduled API call.');
            const kelsier = 'CID_A_100_Athena_Commando_M_Downpour_KC39P';
            const channel = client.channels.cache.get('247456359958708235');
            const thread = channel.threads.cache.get('1054656000222822531');

            // counts the number of days elapsed since start of count.
            const daysPassed = () => { 
                let today = new Date().getTime();
                const previous = new Date('December 19, 2022 11:06:00');
                return Math.ceil((today - previous) / 86400000);
            };
            try {
                const response = await axios.get('https://fortniteapi.io/v2/shop?lang=en&includeRenderData=false&includeHiddenTabs=false', 
                { headers:{ Authorization: process.env.KEY } });
                let dailyShop = response.data.shop;
                console.log('Trying...');
                if (dailyShop.some(item => item.mainId === kelsier)) {
                    // yes response. @-mentions fortnite role
                    console.log('ID present');
                    const embedSkinPresent = new EmbedBuilder()
                        .setColor('Green')
                        .setImage('https://i.imgur.com/8QtwCSc.gif')
                        .setDescription('***YEAH BABEYYYYYY***');
                    await thread.send({ content: `# DAY ${daysPassed()}:`, embeds: [embedSkinPresent] });
                    await thread.send(`<@!1051249902233063425> ***LETS GO LETS GO WAKE UP IT'S HAPPENING***`);
                } else {
                    // no response.
                    console.log('ID absent.');
                    const embedSkinAbsent = new EmbedBuilder()
                        .setColor('730600')
                        .setDescription('**Nope.** <:sadlybradley:531648924453306380>');
                    await thread.send({ content: `# DAY ${daysPassed()}:`, embeds: [embedSkinAbsent] });
                }
                } 
            catch (error) {
                console.log('Error in API call.', error);
            }
        }, {
            scheduled: true,
            timezone: 'Etc/UTC'
        });

    }
}

// to do: consider setting up a database to eventually make this server-nonspecific?
// this would also make tweaking things directly from the server a little cleaner and a fun exercise!