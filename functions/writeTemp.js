import fs from "fs"

function writeTemp(data) {
    fs.writeFile('C:/LongDevs/temp.txt', data, { flag: 'a' }, err => {
        if (err == null) return
        else (console.log(err))
    });
}

export default writeTemp