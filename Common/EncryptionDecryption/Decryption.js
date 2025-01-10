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

        const chunkSize = 128;

        const chunks = [];
        let offset = 0;

        while (offset < encryptedData.length) 
        {
            chunks.push(encryptedData.slice(offset, offset + chunkSize));
            offset += chunkSize;
        }

        const decryptedChunks = chunks.map(chunk => 
        {
            return crypto.privateDecrypt(privateKey, chunk);
        });

        const combinedDecryptedData = Buffer.concat(decryptedChunks);

        return combinedDecryptedData;
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



