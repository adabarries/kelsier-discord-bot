import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName('sayhi')
		.setDescription('Slash command test. He says hello!'),
	async execute(interaction) {
		await interaction.reply('Hello!');
	},
};