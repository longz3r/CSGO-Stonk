import { readFile } from 'fs/promises';
const config = JSON.parse(
    await readFile(
    new URL('/LongDevs/config.json', import.meta.url)
)
);

export default config