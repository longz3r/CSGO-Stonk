import { readFile } from 'fs/promises';
const config = JSON.parse(
    await readFile(
    new URL('/LongDevs/config.json', import.meta.url)
)
);

function removeChars(string) {
    string = string.replace(config.currencySign, "")
    string = string.replace(".", "")
    string = string.replace(",", ".")
    string = parseFloat(string).toFixed(2)
    return string
}

export default removeChars