import { encryptionAlgorithm } from "../../Common/Constants/EncryptionAlgorithm.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import Encryption from "../../Common/EncryptionDecryption/Encryption.js";
import Session from "../../Common/Session.js";
import { generateUniqueId } from "../../Common/Utility/GenerateUniqueId.js";
import Logging from "../Logging/Logging.js";

export function handleKeyExchange(request, response, server)
{ 
    const data = request.body; 

    const rsaPublicKeyOfClient = data["rsaPublicKey"] ;
    const username = data["username"]; 
    const clientIp = request.ip; 
    const port = request.connection.remotePort; 

    const clientIpPort = clientIp + ':' + port; 

    Logging.log(rsaPublicKeyOfClient);
    
    
    if(server.clientsInQueue[username] === clientIpPort)
    {
        //Valid user, create a session id
        const sessionUuid = generateUniqueId(32);
        const clientSession =  new Session(); 
        //Generate aes key
        clientSession.aesKey = Encryption.generateKeyAes(); 
        clientSession.aesInitialVector = Encryption.generateInitialVectorAes();
        clientSession.sessionToken = sessionUuid;
        clientSession.sessionStartTime = Date.now();

        server.sessions[clientIpPort] = clientSession; 

        const clientSessionJson = clientSession.toJson();  

        const encryptedData = Encryption.encrypt(clientSessionJson, encryptionAlgorithm.RSA) ;

        const responseToSend = 
        {
            status: statusCodes.OK, 
            encryptedData: encryptedData
        }; 
        response.json(responseToSend);
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