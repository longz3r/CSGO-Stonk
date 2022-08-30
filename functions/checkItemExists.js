import axios from "axios";
import clc from "cli-color"

async function checkItemExists() {
    axios
    .get(`https://steamcommunity.com/market/priceoverview/?appid=730&currency=15&market_hash_name=${item}`)
    .then(res => {
        let data = res.data
        if (data.success) {
            
        } else {console.log(clc.red("Something went wrong (ofc idk wtf is it)"))}
    })
    .catch(error => {
        if (error.response.statusText == "Internal Server Error") {
            itemNotFound(rawItemName)
        } else {
            console.log(`Steam API: ${clc.redBright(error.response.statusText)} (Code: ${error.response.status})`)
        }
    });
}

export default checkItemExists