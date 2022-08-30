import inquirer from "inquirer";
import process from "process";
import steamMarketRequest from "./functions/steamMarketRequest.js";
import checkItemExists from "./functions/checkItemExists.js"

var choices = {
    home: [
        "Detailed per item",
        "Add item",
        "Bulk add item (WIP)",
        "Exit"
        ],

    deatailedItems: [
        "Go back"
    ]
}

async function home() {
    console.clear()
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'home',
        message: 'Choose an action',
        choices: choices.home,
        }
    ])
    .then(answers => {
        console.clear()
        switch (answers.home) {
            case choices.home[0]:
                deatailedItems()
                break;
            case choices.home[1]:
                addItem()
                break;
            case choices.home[2]:
                home()
                break;
            case choices.home[3]:
                process.exit()
                break;

        }
    });
}

async function deatailedItems() {
    console.clear()
    steamMarketRequest()

    setTimeout(() => {
        console.log("\n")
        inquirer.prompt([
            {
                type: "list",
                name: "\n",
                //invisble character so it dont show stupid thing here
                message: 'Choose an option',
                choices: choices.deatailedItems,
            }
        ]).then(answers => {
            console.clear()
            home()
        })
    }, 2000)
    // console.log("nigga")
}

function addItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemName",
            message: "Enter item name (English)"
        },
        {
            type: "input",
            name: "itemPrice",
            message: "Enter item price (VND only for now)"
        },
        {
            type: "number",
            name: "amount",
            message: "Enter item amount"
        }
    ]).then(answers => {
        console.clear
    })
}


export default home