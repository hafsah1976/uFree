const chars = 'QWERTYUPASDFGHJKLZXCVBNM123456789'

function randInt(max) {
    return Math.floor(max * Math.random());
}

// return a random string of characters with a given length
function generateCode(length=8) {
    let output = '';
    // add length amount of characters
    for (let i = 0; i < length; i++) {
        // get a random character
        const randChar = chars.charAt(randInt(chars.length));
        output += randChar
    }

    return output;
}

module.exports = generateCode;