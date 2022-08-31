import axios from "axios";
import clc from "cli-color";
import removeChars from "./removeChars.js"
import priceFormat from "./priceFormat.js";
import fs from "fs"
import readline from "readline"

async function steamMarketRequest() {

    let totalInvestment = 0;
    let totalCurrentValue = 0;
    let stonkTotal = 0

    const file = readline.createInterface({
        input: fs.createReadStream('C:\\LongDevs\\csgo_stonk_data.txt'),
        output: process.stdout,
        terminal: false
    });

    file.on('line', (line) => {  
        line = line.split(";")  
        let rawItemName = line[0]
        let boughtPrice = line[1]
        let amount = line[2]

        axios
        .get(`https://steamcommunity.com/market/priceoverview/?appid=730&currency=15&market_hash_name=${encodeURI(rawItemName)}`)
        .then(res => {
            let data = res.data
            if (data.success) {
                let currentPrice = data.lowest_price

                currentPrice = removeChars(currentPrice)
                boughtPrice = removeChars(boughtPrice)
                currentPrice = parseFloat(currentPrice)
                boughtPrice = parseFloat(boughtPrice)

                totalInvestment += boughtPrice*amount
                totalCurrentValue += currentPrice*amount

                let stonk = (currentPrice - boughtPrice) * amount
                stonkTotal = stonkTotal + stonk
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
            console.log(error)
            if (error.response.statusText == "Internal Server Error") {
                itemNotFound(rawItemName)
            } else {
                console.log(`Steam API: ${clc.redBright(error.response.statusText)} (Code: ${error.response.status})`)
            }
        });
    });


    setTimeout(() => {
        totalInvestment = priceFormat.format(totalInvestment)
        totalCurrentValue = priceFormat.format(totalCurrentValue)
        console.log(clc.cyanBright("---------------------------------------------"))
        console.log(`${clc.green("Total investment:")} ${totalInvestment}`)
        console.log(`${clc.green("Current value: ")} ${totalCurrentValue}`)

        if (stonkTotal >= 0) {
            stonkTotal = "+" + priceFormat.format(stonkTotal)
            console.log(`${clc.greenBright("You made")} ${stonkTotal} ${clc.greenBright("in total.")}`)
        } else if (stonkTotal < 0) {
            stonkTotal = priceFormat.format(stonkTotal)
            console.log(`${clc.redBright("You lost")} ${stonkTotal} ${clc.redBright("in total.")}`)
        }
    },1500)
}

function itemNotFound(rawItemName) {
    console.log(`${clc.red("Item")} ${clc.green(rawItemName)} ${clc.red("not found on CS:GO steam community market")}`)
    console.log(clc.red("Please double check item name and remove unnecessary space at the begin/end of item name"))
}

export default steamMarketRequest