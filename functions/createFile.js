// import readline from "readline"
import clc from "cli-color"
import fs from "fs"

async function checkFileExists(file) {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

async function createFile() {
    if (!fs.existsSync("C:\\LongDevs")){
        fs.mkdirSync("C:\\LongDevs");
    }


    let dataFileState = await checkFileExists("C:\\LongDevs\\csgo_stonk.txt")
    if (dataFileState) {
        console.log(clc.green("Data file found!"))
    } else {
        
        fs.writeFileSync('C:\\LongDevs\\csgo_stonk.txt', '');
        console.log(clc.green("Data file created at C:\LongDevs\csgo_stonk.txt"))
        console.log("For more information on how to write data please go to")
        console.log("https://github.com/longz3r/CSGO-Stonk#readme")
    }

    // let configFileState = await checkFileExists("C:\\LongDevs\\config.json")
    // if (configFileState) {
        
    // }
}

export default createFile