import fs from 'fs/promises';
import Jimp from 'jimp';

async function encryptImage(inputImagePath, outputImagePath, outputKeyFileName) {
    const image = await Jimp.read(inputImagePath);
    const key = [];
    for (let i = 0; i < image.bitmap.data.length; i++) {
        const value = Math.floor(Math.random() * 256);
        key.push(value);
        image.bitmap.data[i] = (image.bitmap.data[i] + value) % 256;
    }
    await image.writeAsync(outputImagePath);
    await fs.writeFile(outputKeyFileName, key.join(','));
}

async function decryptImage(inputImagePath, outputImagePath, keyFileName) {
    const image = await Jimp.read(inputImagePath);
    const key = (await fs.readFile(keyFileName, 'utf-8')).split(',').map(Number);
    for (let i = 0; i < image.bitmap.data.length; i++) {
        image.bitmap.data[i] = (image.bitmap.data[i] - key[i] + 256) % 256;
    }
    await image.writeAsync(outputImagePath);
}

export { encryptImage, decryptImage };
