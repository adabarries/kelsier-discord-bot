// to do here: add logic for fortnite shop's daily change. look in the api to make sure there's not already something extra for this
import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import axios from 'axios';
import cron from 'node-cron';

// // fortnite api call here
// const getFortniteItemShop = async () => {
//     const kelsier = 'CID_A_100_Athena_Commando_M_Downpour_KC39P';
//     try {
//         const response = await axios.get('https://fortniteapi.io/v2/shop?lang=en&includeRenderData=false&includeHiddenTabs=false'
//         , {headers:{ Authorization: process.env.KEY } });

//         return isKelsierHere(response.data.shop, kelsier);
//     } catch (error) {
//         console.log('Error.', error);
//     }
// }

// logic to determine if 'kelsier' in item shop
// if yes, fuckin blast it
// if no, just say no with a sadface. (add variations?)
// const isKelsierHere = (data, id) => {
//     if (data.some(item => item.mainId === id)) {
//       // command logic here perhaps
//       console.log('ID present.');
//     } else console.log('ID absent.');
// }

// be sure to specify the EXACT thread
// for reference. thread ID: 1054656000222822531 (actual. consider adding a test thread for your own server.)
// test thread ID: 1208862779876966400
// kel's ID: CID_A_100_Athena_Commando_M_Downpour_KC39P



// export default {
//     name: Events.MessageCreate,
//     once: false,
//     async execute (message) {
//         const channel = message.client.channels.cache.get('635935632190865480');
//         const thread = channel.threads.cache.get('1208862779876966400');
//         if (message.content.toLowerCase().includes('fortnite')) {
//             thread.send('Test complete.');
//         } else return;
//     },
// };

export default {
    name: 'daily_fortnite',
    once: false,
    async execute (client) {
        cron.schedule('0 5 0 * * *', async () => { // scheduled to run at 0:05:00 every day
            console.log('running scheduled API call.');
            const kelsier = 'CID_A_100_Athena_Commando_M_Downpour_KC39P';
            const channel = client.channels.cache.get('635935632190865480');
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
                    // embed for this here. be sure to @ members
                } else {
                    console.log('ID absent.');
                    const embedSkinAbsent = new EmbedBuilder()
                        .setColor('730600')
                        .setTitle(`DAY ${daysPassed()}:`)
                        .setDescription('No. <:crey:828406658526085120>')
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