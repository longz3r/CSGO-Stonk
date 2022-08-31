import fs from "fs"

async function writeData(data) {
    fs.writeFile('C:\\LongDevs\\csgo_stonk_data.txt', data+"\n", { flag: 'a' }, err => {
        if (err == null) {
            return
        } else {
            console.log(err)
        }
    });
}

export default writeData