import { Client } from "discord.js";

// to do: logic for determining if a certain phrase (two words) is 6 + 6 OR 4 + 6 and respond accordingly
// example event 'something something fire emblem'
// example response: 'Fire Emblem is a canon-compliant homestuck kid name.'

// use includes() probably but you would need to find two substrings in a specific order....regex?


const matchName = (msg) => {
    const kidMatches = msg.match(/(\b[A-Z]{4}\s[A-Z]{6,7})/gi);
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
    
    const trollMatches = msg.match(/(\b[A-Z]{6}\s[A-Z]{6})/gi);
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
        if (canonKidNames.indexOf(kidMatches[0].toLowerCase()) === -1) {
            console.log(`${kidMatches[0]} is a valid homestuck kid name.`);
        }
    } else if (trollMatches) {
        if (canonTrollNames.indexOf(trollMatches[0].toLowerCase()) === -1) {
            console.log(`${trollMatches[0]} is a valid homestuck troll name.`);
            return trollMatches[0]; // convert this to a message event later
        }
    } else return;
};

const name = 'messageCreate';