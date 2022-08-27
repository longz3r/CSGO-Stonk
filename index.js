const axios = require("axios")
const fs = require("fs")
const readline = require('readline');
const clc = require("cli-color")
const process = require("process")

process.stdin.resume();
process.on('SIGINT', () => { process.exit(); });

async function checkFileExists(file) {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

function itemNotFound(rawItemName) {
    console.log(`${clc.red("Item")} ${clc.green(rawItemName)} ${clc.red("not found on CS:GO steam community market")}`)
    console.log(clc.red("Please double check item name and remove unnecessary space at the begin/end of item name"))
}

async function checkFile() {
    dataFileState = await checkFileExists("C:\\LongDevs\\csgo_stonk.txt")
    if (dataFileState) {
        console.log(clc.green("Data file found!"))
        
    } else {
        if (!fs.existsSync("C:\\LongDevs")){
            fs.mkdirSync("C:\\LongDevs");
        }
        fs.writeFileSync('C:\\LongDevs\\csgo_stonk.txt', '');
        console.log(clc.green("Data file created at C:\LongDevs\csgo_stonk.txt"))
        console.log("For more information on how to write data please read README.md")
    }

    // configFileState = await checkFileExists("C:\\LongDevs\\csgo_stonk.txt")
}


var totalInvestment = 0;
var totalCurrentPrice = 0;

async function SteamMarketRequest(rawItemName, boughtPrice, amount) {
    let item = encodeURI(rawItemName)
    axios
    .get(`https://steamcommunity.com/market/priceoverview/?appid=730&currency=15&market_hash_name=${item}`)
    .then(res => {
        let data = res.data
        if (data.success) {
            console.log("\n")
            let lowestPrice = data.lowest_price
            console.log(`(${amount}) ${clc.cyan(rawItemName)}`)
            console.log(`${clc.yellow("Current price:")} ${lowestPrice}`)
            console.log(`${clc.yellow("Bought price:")} ${boughtPrice}₫`)

            //remove unwanted chracter in price string
            lowestPrice = lowestPrice.replace(".", "")
            lowestPrice = lowestPrice.replace(",", ".")
            lowestPrice = parseFloat(lowestPrice).toFixed(2)

            let stonk = (lowestPrice - boughtPrice) * amount
            stonk = parseFloat(stonk).toFixed(2)
            if (stonk >= 0) {
                console.log(`${clc.greenBright("You made")} ${stonk}₫ ${clc.greenBright("total in this item(s)")}`)
            } else if (stonk < 0) {
                console.log(`${clc.redBright("You lost")} ${stonk}₫ ${clc.redBright("total in this item(s)")}`)
            }

            totalInvestment += boughtPrice*amount
            totalCurrentPrice += lowestPrice*amount
        }
    })
    .catch(error => {
        itemNotFound(rawItemName)
    });
}

async function main() {
    await checkFile()
    
    const file = readline.createInterface({
        input: fs.createReadStream('C:\\LongDevs\\csgo_stonk.txt'),
        output: process.stdout,
        terminal: false
    });
    

    await file.on('line', (line) => {
        let args = line.split(";")

        //remove unwated characters in string
        let boughtPrice = args[1].replace("₫", "")
        boughtPrice = boughtPrice.replace(".", "")
        boughtPrice = boughtPrice.replace(",", ".")
        boughtPrice = parseFloat(boughtPrice).toFixed(2)
        SteamMarketRequest(args[0], boughtPrice, args[2])
    });

    await setTimeout(() => {
        //wait 2s because it take some time to do API request
        console.log(clc.cyanBright("---------------------------------------------"))
        console.log(`${clc.green("Total investment:")} ${totalInvestment}₫`)
        console.log(`${clc.green("Current value: ")} ${totalCurrentPrice}₫`)
        let stonk = totalCurrentPrice - totalInvestment
        stonk = parseFloat(stonk).toFixed(2)
        if (stonk >= 0) {
            console.log(`${clc.greenBright("You made")} ${stonk}₫ ${clc.greenBright("in total.")}`)
        } else if (stonk < 0) {
            console.log(`${clc.redBright("You lost")} ${stonk}₫ ${clc.redBright("in total.")}`)
        }
        console.log("Press Ctrl+c to exit")
    }, 2000)
    
}

main()