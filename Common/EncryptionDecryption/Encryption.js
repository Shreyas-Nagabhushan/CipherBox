import Logging from '../../Server/Logging/Logging.js';
import { encryptionAlgorithm } from '../Constants/EncryptionAlgorithm.js';
import EncryptionDecryption from '../EncryptionDecryption/EncryptionDecryption.js';
import Decryption from './Decryption.js';
import EncryptedData from './EncryptedData.js';

const crypto = require('crypto');

class Encryption extends EncryptionDecryption
{
    static rsaPublicKey = null;
    static rsaPrivateKey = null;

    static generateKeyAes()
    {
        return crypto.randomBytes(32).toString('base64');
    }

    static generateInitialVectorAes()
    {
        return crypto.randomBytes(16).toString('base64'); 
    }

    static generateKeyPairRsa()
    {
        const { publicKey, privateKey } = crypto.generateKeyPairSync(
        'rsa',
        {   
            modulusLength: 2048, 
            publicKeyEncoding: 
            {
                type: 'spki', 
                format: 'pem', 
            },
            privateKeyEncoding: 
            {
                type: 'pkcs8', 
                format: 'pem', 
            }, 
        });

        Encryption.rsaPublicKey = publicKey;
        Encryption.rsaPrivateKey = privateKey;
        return { publicKey: publicKey, privateKey: privateKey };
    }

    static aes(data, key, initialVector)
    {
        if (!(data instanceof Buffer)) 
        {
            return null;
        }
    
        const cipher = crypto.createCipheriv('aes-256-cbc', key, initialVector);  
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]); 

        const encryptedDataObject = new EncryptedData(encrypted, key, null, initialVector);
        return encryptedDataObject; 
    }

    static rsa(data, publicKey)
    {
        if(!(data instanceof Buffer))
        {
            console.error("Input data must be a buffer!");
            return null;
        }
        
        const chunkSize = 128;
        const chunks = [];

        for (let i = 0; i < data.length; i += chunkSize) 
        {
            chunks.push(data.subarray(i, i + chunkSize));
        }

        const encryptedChunks = chunks.map(chunk => 
        {
            const encrypted = crypto.publicEncrypt(publicKey, chunk);
            return Buffer.from(encrypted); 
        });

        const combinedEncryptedData = Buffer.concat(encryptedChunks);
        
        const encryptedDataObject = new EncryptedData(combinedEncryptedData, null, publicKey);
        return encryptedDataObject;
    }
    
    static encrypt(data, algorithmUsed, rsaPublicKey = null)
    {
        switch(algorithmUsed)
        {
            case encryptionAlgorithm.AES:
            {
                const key = Encryption.generateKeyAes();
                const initialVector = Encryption.generateInitialVectorAes();
                return Encryption.aes(data, key, initialVector);
            }
                
            case encryptionAlgorithm.RSA:
            { 
                return Encryption.rsa(data, rsaPublicKey);
            }     

        }
    }
}

export default Encryption;


// console.log(Encryption.encrypt(new TextEncoder().encode(new String("Hello World")), encryptionAlgorithm.AES));

// const encyptedData = Encryption.encrypt(new TextEncoder().encode(new String("Hello World")), encryptionAlgorithm.AES);

// // AES Decryption function
// const AES_Decryption = (data) => 
// {
//     const decipher = crypto.createDecipheriv('aes-256-cbc', encyptedData.privateKey, encyptedData.initialVector);
//     const decrypted = Buffer.concat([decipher.update(encyptedData.data), decipher.final()]);
//     return decrypted;
// };

// const decryptedData = Decryption.decrypt(encyptedData,encryptionAlgorithm.AES);
// const finalText = decryptedData.toString('utf-8');  
// // console.log(decryptedData);
// console.log(finalText); 

