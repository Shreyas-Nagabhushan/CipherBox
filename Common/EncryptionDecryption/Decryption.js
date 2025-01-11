import { encryptionAlgorithm } from '../Constants/EncryptionAlgorithm.js';
import EncryptionDecryption from '../EncryptionDecryption/EncryptionDecryption.js';
import Encryption from './Encryption.js';

const crypto = require('crypto');

class Decryption extends EncryptionDecryption
{   
    static aes(encryptedData)
    {
        const decipher=crypto.createDecipheriv('aes-256-cbc',encryptedData.privateKey,encryptedData.initialVector);
        const decrypted=Buffer.concat([decipher.update(encryptedData.data),decipher.final()]);
        return decrypted;
    }
    static rsa(encryptedDataObject)
    {
        const encryptedData = encryptedDataObject.data;
        const privateKey = encryptedDataObject.privateKey;

        console.log(encryptedData.byteLength);
        const chunkSize = 256; 
        const decryptedChunks = [];

        for (let i = 0; i < encryptedData.length; i += chunkSize) 
        {
            const chunk = encryptedData.slice(i, i + chunkSize);
            const decrypted = crypto.privateDecrypt(privateKey, chunk);
            decryptedChunks.push(decrypted);
        }

        const originalData = Buffer.concat(decryptedChunks);

        return originalData;
    }

    static decrypt(encryptedData,algorithmUsed)
    {
        switch(algorithmUsed)
        {
            case encryptionAlgorithm.AES:
            {     
                return Decryption.aes(encryptedData);
            }
            case encryptionAlgorithm.RSA:
            {
                return Decryption.rsa(encryptedData);
            }
        }
    }
}
export default Decryption;



