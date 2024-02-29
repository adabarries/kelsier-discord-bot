import { Events, ActivityType } from 'discord.js';

// export default {
//     name: Events.ClientReady,
//     once: true,
//     execute(client) {
//         console.log('Client is ready. User tag: ' + client.user.tag);
//         client.user.setActivity('Your Mooooooom', { type: ActivityType.Playing })
//     }
// };

export const once = true;
export const name = Events.ClientReady;

export async function execute(client) {
    console.log('Client is ready. User tag: ' + client.user.tag);
    client.user.setActivity('Your Mooooooom', { type: ActivityType.Playing })
}