import axios from "axios";
import clc from "cli-color";
import data from "./readData.js";
import removeChars from "./removeChars.js"
import priceFormat from "./priceFormat.js";
import writeTemp from "./writeTemp.js";
import fs from "fs"
import temp from "./readTemp.js"

async function splitArgs() {
    fs.writeFileSync('C:\\LongDevs\\temp.txt', '');
    for (let i = 0; i < data.length; i++) {
        let args = data[i].split(";")
        let rawItemName = args[0]
        let boughtPrice = args[1]
        let amount = args[2]

        await steamMarketRequest(rawItemName, boughtPrice, amount)
    }

    let stonk = 0
    for (let i = 1; i < temp.length; i++) {
            temp[i] = parseFloat(temp[i])
            stonk = stonk + temp[i]
        }
    console.log(temp)
}


function itemNotFound(rawItemName) {
    console.log(`${clc.red("Item")} ${clc.green(rawItemName)} ${clc.red("not found on CS:GO steam community market")}`)
    console.log(clc.red("Please double check item name and remove unnecessary space at the begin/end of item name"))
}

async function steamMarketRequest(rawItemName, boughtPrice, amount) {
    let item = encodeURI(rawItemName)
    axios
    .get(`https://steamcommunity.com/market/priceoverview/?appid=730&currency=15&market_hash_name=${item}`)
    .then(res => {
        let data = res.data
        if (data.success) {
            let currentPrice = data.lowest_price

            currentPrice = removeChars(currentPrice)
            boughtPrice = removeChars(boughtPrice)

            let stonk = (currentPrice - boughtPrice) * amount
            writeTemp(stonk+"\n")
            if (stonk >= 0) {
                stonk = "+" + priceFormat.format(stonk)
                console.log(`(${amount}) ${clc.cyan(rawItemName)} [${clc.greenBright(`${stonk}`)}]`)
            } else if (stonk < 0) {
                stonk = priceFormat.format(stonk)
                console.log(`(${amount}) ${clc.cyan(rawItemName)} [${clc.redBright(`${stonk}`)}]`)
            }
            
        }
    })
    .catch(error => {
        if (error.response.statusText == "Internal Server Error") {
            itemNotFound(rawItemName)
        } else {
            console.log(`Steam API: ${clc.redBright(error.response.statusText)} (Code: ${error.response.status})`)
        }
    });
}

export default splitArgs