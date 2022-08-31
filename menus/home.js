import inquirer from "inquirer";
import process from "process";
import deatailedItems from "./detailedItems.js";
import addItem from "./addItem.js"

let choices = [
    "Detailed per item",
    "Add item",
    "Bulk add item (WIP)",
    "Exit"
    ]

function home() {
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'home',
        message: 'Choose an action',
        choices: choices,
        }
    ])
    .then(answers => {
        console.clear()
        switch (answers.home) {
            case choices[0]:
                deatailedItems()
                break;
            case choices[1]:
                addItem()
                break;
            case choices[2]:
                home()
                break;
            case choices[3]:
                process.exit()
                break;

        }
    });
}




export default home