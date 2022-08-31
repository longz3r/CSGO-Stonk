import inquirer from "inquirer"
import home from "./home.js"
import steamMarketRequest from "../functions/steamMarketRequest.js"

var choices = ["Go back"]

function deatailedItems() {
    console.clear()
    steamMarketRequest()

    setTimeout(() => {
        console.log("\n")
        inquirer.prompt([
            {
                type: "list",
                name: "\n",
                message: 'Choose an option',
                choices: choices,
            }
        ]).then(answers => {
            console.clear()
            home()
        })
    }, 2000)
    // console.log("nigga")
}

export default deatailedItems