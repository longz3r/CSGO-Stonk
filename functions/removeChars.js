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
    return string
}

export default removeChars