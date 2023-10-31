const db = require('../config/connection');

const chars = 'QWERTYUPASDFGHJKLZXCVBNM123456789';

function randInt(max) {
    return Math.floor(max * Math.random());
}

let eventCodes = new Set();

function setEventCodes(codes) {
    eventCodes = codes;
}

function getNewCode(length) {
    let output = '';
    // add length amount of characters
    for (let i = 0; i < length; i++) {
        // get a random character
        const randChar = chars.charAt(randInt(chars.length));
        output += randChar
    }

    return output;
}

// return a random string of characters with a given length
function generateCode(length=8) {
    return () => {
        const startLen = eventCodes.size;
    
        // attempt to add a new code
        let code = getNewCode(length);
        eventCodes.add(code);
        
        // if code is not unique, keep trying
        while (eventCodes.size === startLen) {
            code = getNewCode(length);
            eventCodes.add(code);
        }
    
        return code;
    };
}


module.exports = { setEventCodes, generateCode };