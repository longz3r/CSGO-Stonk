import readline from "readline";
import fs from "fs";

const file = readline.createInterface({
    input: fs.createReadStream('C:\\LongDevs\\csgo_stonk.txt'),
    output: process.stdout,
    terminal: false
});

var data = []

file.on('line', (line) => {    
    data.push(line)
});

export default data