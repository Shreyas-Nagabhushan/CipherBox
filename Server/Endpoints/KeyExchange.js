import { encryptionAlgorithm } from "../../Common/Constants/EncryptionAlgorithm.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import Encryption from "../../Common/EncryptionDecryption/Encryption.js";
import Logging from "../Logging/Logging.js";
import { createSession } from "../../Common/Utility/CreateSession.js";
import { createFileSystemTreeServer } from "../../Common/Utility/CreateFileSystemTree.js";

export function handleKeyExchange(request, response, server)
{ 
    const data = request.body; 

    const rsaPublicKeyOfClient = data["rsaPublicKey"];
    const username = data["username"]; 
    const clientIp = request.ip;     
    
    if(server.clientsInQueue[username] == clientIp)
    {
        const clientSession =  createSession(username); 
        server.sessions[clientIp] = clientSession; 

        const clientSessionJson = clientSession.toJson();

        
        // const fileSystemTree = createFileSystemTreeServer();
        // server.fileSystemTree = fileSystemTree;
        const fileSystemTreeJson = server.fileSystemTree.toJson();

        const responseToSend = 
        {
            status: statusCodes.OK, 
            session: clientSessionJson,
            fileSystemTree: fileSystemTreeJson
        }; 

        const responseObjectString = JSON.stringify(responseToSend);
        const responseObjectBuffer = Buffer.from(responseObjectString, "utf-8");

        const encryptedDataObject = Encryption.encrypt(responseObjectBuffer, encryptionAlgorithm.RSA, rsaPublicKeyOfClient); 
        const encryptedData = encryptedDataObject.data;
        const encryptedDataBase64 = encryptedData.toString("base64");
        
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