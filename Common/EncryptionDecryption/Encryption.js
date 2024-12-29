// import {EncryptionDecryption} from '../EncryptionDecryption/EncryptionDecryption';
// import crypto from 'crypto';
const crypto =require('crypto');
// class Encryption //extends EncryptionDecryption
// {
//     // constructor()
//     // {
//     //     super();
//     //     this.levels=[]
//     // }
    
  
// }
// export default Encryption;


const key = crypto.randomBytes(32);  
const iv = crypto.randomBytes(16); 

// AES Encryption function
const AES_Encryption = (data) => {
    if (!(data instanceof Uint8Array)) {
        throw new Error('Input must be a Uint8Array');
    }

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);  
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);  
    return encrypted; 
};

let pt = "Hello world";
// const originalData = Buffer.from(pt, 'utf-8'); 
const originalData = new TextEncoder().encode(pt);
// Encrypt the data
const encryptedData = AES_Encryption(originalData);

console.log(encryptedData.toString('utf-8'));
console.log('Encrypted data successfully processed.');

// AES Decryption function
const AES_Decryption = (data) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    return decrypted;
};

const decryptedData = AES_Decryption(encryptedData);

const finalText = decryptedData.toString('utf-8');  
console.log(finalText); 
console.log("Successfully Decrypted");

