import inquirer from "inquirer";
import checkItemExist from "../functions/checkItemExists.js"
import writeData from "../functions/writeData.js";
import clc from "cli-color";
import home from "./home.js";

async function addItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemName",
            message: "Enter item name (English)"
        },
        {
            type: "input",
            name: "itemPrice",
            message: `Enter item price (VND only for now. Use "," to seperate from decimal) copy price directly from steam is recommended`
        },
        {
            type: "number",
            name: "itemAmount",
            message: "Enter item amount"
        }
    ]).then(async answers => {
        //process item name to remove unncessary space that can fuck up api request
        answers.itemName = answers.itemName.split(/\s+/)
        answers.itemName = answers.itemName.join(" ")

        let result = await checkItemExist(answers.itemName)
        
        if (result.success) {
            writeData(`${answers.itemName};${answers.itemPrice};${answers.itemAmount}`)
            console.clear()
            console.log(clc.green("Success!"))
            home()
        } else {
            console.log(result.message)
            addItem()
        }
    })
}

export default addItem