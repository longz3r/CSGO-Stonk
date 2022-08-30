import inquirer from "inquirer";
import process from "process";
import steamMarketRequest from "./functions/steamMarketRequest.js";
import temp from "./functions/readTemp.js"

var choices = {
    home: [
        "Add item",
        "Detailed per item",
        "Refresh stonk", 
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
                console.log("working")
                break;
            case choices.home[1]:
                deatailedItems()
                break;
            case choices.home[2]:
                break;
            case choices.home[3]:
                process.exit()
                break;
            case choices.home[4]:
                break;

        }
    });
}

async function deatailedItems() {
    console.clear()
    steamMarketRequest()
    setTimeout(() => {
        // let stonk = 0
        // for (let i = 1; i < temp.length; i++) {
        //     stonk = stonk + temp[i]
        // }

        // console.log(stonk)
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


export default home