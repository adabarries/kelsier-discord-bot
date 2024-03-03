import { Events } from "discord.js";

// const matchName = (msg) => {
//     const kidMatches = msg.match(/(\b[A-Z]{4}\s[A-Z]{6,7})/gi);
//     const canonKidNames = [ 
//         'john egbert', 
//         'jane crocker', 
//         'dave strider', 
//         'dirk strider',
//         'jade harley',
//         'rose lalonde',
//         'jake english',
//         'roxy lalonde'
//     ];
    
//     const trollMatches = msg.match(/(\b[A-Z]{6}\s[A-Z]{6})/gi);
//     const canonTrollNames = [
//         'aradia megido',
//         'tavros nitram',
//         'sollux captor',
//         'karkat vantas',
//         'nepeta leijon',
//         'kanaya maryam',
//         'terezi pyrope',
//         'vriska serket',
//         'equius zahhak',
//         'gamzee makara',
//         'eridan ampora',
//         'feferi peixes',
//         'damara megido',
//         'rufioh nitram',
//         'mituna captor',
//         'kankri vantas',
//         'meulin leijon',
//         'porrim maryam',
//         'latula pyrope',
//         'aranea serket',
//         'horuss zahhak', 
//         'kurloz makara',
//         'cronus ampora',
//         'meenah peixes'
//     ]; // wow. consider housing these elsewhere.

//     if (kidMatches) {
//         if (canonKidNames.indexOf(kidMatches[0]) === -1) {
//             console.log(`${kidMatches[0]} is a valid homestuck kid name.`);
//             message.channel.send(`${kidMatches[0]} is a valid homestuck kid name.`);
//         }
//     } else if (trollMatches) {
//         if (canonTrollNames.indexOf(trollMatches[0]) === -1) {
//             console.log(`${trollMatches[0]} is a valid homestuck troll name.`);
//             message.channel.send(`${trollMatches[0]} is a valid homestuck troll name.`);
//         }
//     } else return;
// };

export default {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        const msg = message.content.toLowerCase();
        if (message.author.bot) return;

        // ----- homestuck name goof. ----- //
        const kidMatches = message.content.match(/(\b[A-Z]{4}\s[A-Z]{6,7})/gi);
        const trollMatches = message.content.match(/(\b[A-Z]{6}\s[A-Z]{6})/gi);

        const canonKidNames = [ 
            'john egbert', 
            'jane crocker', 
            'dave strider', 
            'dirk strider',
            'jade harley',
            'rose lalonde',
            'jake english',
            'roxy lalonde'
        ];

        const canonTrollNames = [
            'aradia megido',
            'tavros nitram',
            'sollux captor',
            'karkat vantas',
            'nepeta leijon',
            'kanaya maryam',
            'terezi pyrope',
            'vriska serket',
            'equius zahhak',
            'gamzee makara',
            'eridan ampora',
            'feferi peixes',
            'damara megido',
            'rufioh nitram',
            'mituna captor',
            'kankri vantas',
            'meulin leijon',
            'porrim maryam',
            'latula pyrope',
            'aranea serket',
            'horuss zahhak', 
            'kurloz makara',
            'cronus ampora',
            'meenah peixes'
        ]; // wow. consider housing these elsewhere.

        if (kidMatches) {
            if (canonKidNames.indexOf(kidMatches[0]) === -1) {
                message.channel.send(`${kidMatches[0]} is a valid homestuck kid name.`);
            }
        } else if (trollMatches) {
            if (canonTrollNames.indexOf(trollMatches[0]) === -1) {
                message.channel.send(`${trollMatches[0]} is a valid homestuck troll name.`);
            }
        }

        const channel = message.client.channels.cache.get('635935632190865480');
        const thread = channel.threads.cache.get('1208862779876966400');
        if (message.content.toLowerCase().includes('fortnite')) {
            thread.send('Test complete.');
        }
    },
};