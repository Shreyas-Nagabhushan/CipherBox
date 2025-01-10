export function base64ToUint8Array(base64String) 
{
    let binaryString = atob(base64String);
    let uint8Array = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) 
    {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    
    return uint8Array;
}
