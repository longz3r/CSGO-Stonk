import axios from "axios";
import clc from "cli-color"

let result = {
    success: false,
    message: "",
}

async function checkItemExists(rawItemName) {
    await axios
    .get(`https://steamcommunity.com/market/priceoverview/?appid=730&currency=15&market_hash_name=${encodeURI(rawItemName)}`)
    .then(res => {
        let data = res.data
        if (data.success) {
            result.success = true
        } else {
            result.message = clc.red("Something went wrong (ofc idk wtf is it)")
        }
    })
    .catch(error => {
        if (error.response.statusText == "Internal Server Error") {
            result.message = `${clc.red("Item")} ${clc.green(rawItemName)} ${clc.red("not found on CS:GO steam community market")}`
        } else {
            result.message = `Steam API: ${clc.redBright(error.response.statusText)} (Code: ${error.response.status})`
        }
    });

    return result
}

export default checkItemExists