const crypto = require('crypto');

const IV_LENGTH = 16; // AES IV length is 16 bytes

function getAlgorithm(keySize) {
    switch (keySize) {
        case '128':
            return 'aes-128-cbc';
        case '192':
            return 'aes-192-cbc';
        case '256':
            return 'aes-256-cbc';
        default:
            throw new Error('Invalid key size. Must be 128, 192, or 256.');
    }
}

function encrypt(text, encryptionKey, iv, keySize) {
    const algorithm = getAlgorithm(keySize);
    let ivBuffer;

    if (iv) {
        if (iv.length !== IV_LENGTH) {
            throw new Error('IV must be 16 ASCII characters long.');
        }
        ivBuffer = Buffer.from(iv, 'ascii');
    } else {
        ivBuffer = crypto.randomBytes(IV_LENGTH);
    }

    let cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey, 'utf8'), ivBuffer);
    let encrypted = cipher.update(text, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return ivBuffer.toString('ascii') + ':' + encrypted.toString('hex');
}

function decrypt(encryptedText, encryptionKey, iv, keySize) {
    const algorithm = getAlgorithm(keySize);
    let ivBuffer;

    if (iv) {
        if (iv.length !== IV_LENGTH) {
            throw new Error('IV must be 16 ASCII characters long.');
        }
        ivBuffer = Buffer.from(iv, 'ascii');
    } else {
        throw new Error('IV is required for decryption.');
    }

    let textParts = encryptedText.split(':');
    let ivFromText = Buffer.from(textParts.shift(), 'ascii');
    if (!ivBuffer.equals(ivFromText)) {
        throw new Error('IV mismatch.');
    }

    let encryptedData = textParts.join(':');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey, 'utf8'), ivBuffer);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };
