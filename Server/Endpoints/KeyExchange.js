import { encryptionAlgorithm } from "../../Common/Constants/EncryptionAlgorithm.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import Encryption from "../../Common/EncryptionDecryption/Encryption.js";
import { generateUniqueId } from "../../Common/Utility/GenerateUniqueId.js";
import Logging from "../Logging/Logging.js";
import { createSession } from "../../Common/Utility/CreateSession.js";
import { uint8ArrayToBase64 } from "../../Common/Utility/UInt8ArrayToBase64.js";

export function handleKeyExchange(request, response, server)
{ 
    const data = request.body; 

    const rsaPublicKeyOfClient = data["rsaPublicKey"];
    const username = data["username"]; 
    const clientIp = request.ip; 
    const port = request.connection.remotePort; 

    const clientIpPort = clientIp + ':' + port; 

    Logging.log(rsaPublicKeyOfClient);
    
    
    if(server.clientsInQueue[username] == clientIpPort)
    {
        const clientSession =  createSession(); 
        server.sessions[clientIpPort] = clientSession; 

        const clientSessionJson = clientSession.toJson();
        const clientSessionJsonString = JSON.stringify(clientSessionJson);
        const clientSessionJsonBuffer = Buffer.from(clientSessionJsonString, "utf-8");
        const clientSessionBase64 = clientSessionJsonBuffer.toString("base64");

        const responseToSend = 
        {
            status: statusCodes.OK, 
            encryptedData: clientSessionBase64
        }; 

        const responseObjectString = JSON.stringify(responseToSend);
        const responseObjectBuffer = Buffer.from(responseObjectString, "utf-8");

        const encryptedDataObject = Encryption.encrypt(responseObjectBuffer, encryptionAlgorithm.RSA, rsaPublicKeyOfClient); 
        const encryptedData = encryptedDataObject.data;
        const encryptedDataBase64 = encryptedData.toString("base64");

        console.log(encryptedDataBase64);
        
        response.send(encryptedDataBase64);
    }
    else
    {
        //Someone being sus
        const responseToSend =
        {
            status : statusCodes.UNAUTHORIZED,
            message: "Someone being SUS!!"
        }
        response.json(responseToSend);
    }


}

/*
We have public key of the client now
We will have to generate aes key, which will be encrypted using rsa public key of the client
Send this encrypted data back to the client
The client will decrypt the message and get the aes key using his rsa private key
*/