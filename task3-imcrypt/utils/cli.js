import meowHelp from 'cli-meow-help';

const flags = {
    encrypt: {
        type: 'string',
        desc: 'The image to encrypt',
        shortFlag: 'e'
    },
    decrypt: {
        type: 'string',
        desc: 'The image to decrypt',
        shortFlag: 'd'
    },
    outputImageFileName: {
        type: 'string',
        desc: 'The output image file name',
        shortFlag: 'i'
    },
    outputKeyFileName: {
        type: 'string',
        desc: 'The output key file name',
        shortFlag: 'p'
    },
    key: {
        type: 'string',
        desc: 'The key file to use for decryption',
        shortFlag: 'k'
    },
    clear: {
        type: 'boolean',
        default: false,
        shortFlag: 'c'
    },
    noClear: {
        type: 'boolean',
        default: true
    },
    version: {
        type: 'boolean',
        shortFlag: 'v'
    }
};

const commands = {
    help: { desc: 'Print help info' }
};

const helpText = meowHelp({
    name: 'imcrypt',
    flags,
    commands
});

const options = {
    importMeta: import.meta,
    inferType: true,
    description: false,
    hardRejection: false,
    flags
};

const meow = (await import('meow')).default;

export async function loadCli() {
    return meow(helpText, options);
}
