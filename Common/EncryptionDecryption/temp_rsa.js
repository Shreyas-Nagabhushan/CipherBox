const crypto=require('crypto');
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa',{ modulusLength:2048 });
const RSA_Encryption=(data)=>
{
    return crypto.publicEncrypt(publicKey, data);
}
const RSA_Decryption=(data)=>
{
    return crypto.privateDecrypt(privateKey,data);
}
let pt="Hello world";
const originalData=new TextEncoder().encode(pt);
const encryptedData=RSA_Encryption(originalData);
console.log(encryptedData);
console.log(encryptedData.toString('utf-8'));
console.log("\n");
const decryptedData=RSA_Decryption(encryptedData);
console.log(decryptedData);
console.log(decryptedData.toString('utf-8'));