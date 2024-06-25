import { loadCli } from './utils/cli.js';
import { encryptImage, decryptImage } from './utils/encrypt.js';

const cli = await loadCli();

const { input, flags } = cli;

if (flags.encrypt) {
    await encryptImage(flags.encrypt, flags.outputImageFileName, flags.outputKeyFileName);
    console.log('Image encrypted successfully.');
} else if (flags.decrypt) {
    await decryptImage(flags.decrypt, flags.outputImageFileName, flags.key);
    console.log('Image decrypted successfully.');
} else {
    cli.showHelp();
}
