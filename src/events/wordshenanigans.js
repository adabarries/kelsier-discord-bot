import { Events } from "discord.js";
import { stringstorage } from "src\storage\stringstorage.json";
import { replies } from "src\storage\replies.json";

export default {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        const msg = message.content.toLowerCase();

        // sable-chat and politics channels respectively. really don't want the bot kicking in if
        // someone's talking about a family tragedy or something really dire lol
        // const forbiddenChannels = ['528773521707630602', '684543154334072848']; // real
        const forbiddenChannels = ['825208364966346762', '909036630948577300']; //test. shitpost and acnh
        if (message.author.bot) return;
        if (forbiddenChannels.includes(message.channel.id)) return;
        
        // ----- reply shenanigans specifically to dunk on falc ----- //
        if (message.author.id === '55111061807824896' && msg.startsWith('hmm')) {
            let index = Math.floor(Math.random() * replies.falcReplies.length);
            message.reply(replies.falcReplies[index]);
        }

        // ----- homestuck name goof. i learned regex for this. ----- //
        const kidMatches = msg.match(/(\b[A-Z]{4}\s[A-Z]{6,7})/gi);
        const trollMatches = msg.match(/(\b[A-Z]{6}\s[A-Z]{6})/gi);

        if (kidMatches) {
            if (stringstorage.canonKidNames.indexOf(kidMatches[0]) === -1) {
                message.channel.send(`${kidMatches[0]} is a valid homestuck kid name.`);
            }
        } else if (trollMatches) {
            if (stringstorage.canonTrollNames.indexOf(trollMatches[0]) === -1) {
                message.channel.send(`${trollMatches[0]} is a valid homestuck troll name.`);
            }
        }
    },
};