import createFile from "./functions/createFile.js"
import menus from "./menus/home.js"

async function main() {
    await createFile()
    menus()

    // await setTimeout(() => {
    //     //wait 2s because it take some time to do API request
    //     console.log(clc.cyanBright("---------------------------------------------"))
    //     console.log(`${clc.green("Total investment:")} ${totalInvestment}₫`)
    //     console.log(`${clc.green("Current value: ")} ${totalCurrentPrice}₫`)
    //     let stonk = totalCurrentPrice - totalInvestment
    //     stonk = parseFloat(stonk).toFixed(2)
    //     if (stonk >= 0) {
    //         console.log(`${clc.greenBright("You made")} ${stonk}₫ ${clc.greenBright("in total.")}`)
    //     } else if (stonk < 0) {
    //         console.log(`${clc.redBright("You lost")} ${stonk}₫ ${clc.redBright("in total.")}`)
    //     }
    //     console.log("Press Ctrl+c to exit")
    // }, 2000)

}

main()