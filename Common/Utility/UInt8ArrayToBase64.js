export function uint8ArrayToBase64(uint8Array) 
{
    let binaryString = "";

    for (let byte of uint8Array) 
    {
        binaryString += String.fromCharCode(byte);
    }

    return btoa(binaryString);
}
