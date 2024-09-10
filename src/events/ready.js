import { Events, ActivityType } from 'discord.js';

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity('Dawntrail.', { type: ActivityType.Playing });
	},
};