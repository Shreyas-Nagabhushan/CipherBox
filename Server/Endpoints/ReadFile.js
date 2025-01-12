import Client from "../../Client/Client.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import Encryption from "../../Common/EncryptionDecryption/Encryption.js";
import { validateSession } from "../../Common/Utility/ValidateSession.js";

export function handleReadFile(request, response, server)
{
    const dataReceived = request.body;
    const sessionJson = dataReceived.session;
    const relativePath = dataReceived.relativePath;
    const fileSystemTree = server.fileSystemTree;
    const clientIp = request.ip; 

    const bValidSesssion = validateSession(request,server);
    
    console.log("Relative path split of file: "+ relativePath.split("/"));

    if(bValidSesssion)
    {
        const userObject = server.usersList[sessionJson["username"]];
        const fileContent = fileSystemTree.getFileFromRelativePath(relativePath);

        const bValidSesssion = validateSession(request, server);

        const serverSideSession = server.sessions[clientIp];

        const currentFileMetaData = server.fileSystemTree.getFileMetaDataFromRelativePath(relativePath) ;
    
        if(userObject.privilege.readPrivilege >= currentFileMetaData.privilege.readPrivilege) // TODO : Check privilege level
        {
            //Send the file
            const responseToSend =
            {
                status : statusCodes.OK,
                fileContent: fileContent
            }

            const responseToSendString = JSON.stringify(responseToSend);
            const responseToSendBuffer = Buffer.from(responseToSendString, "utf-8");
             
            const encryptedObject = Encryption.aes(responseToSendBuffer, Buffer.from(serverSideSession.aesKey, "base64"), Buffer.from(serverSideSession.aesInitialVector, "base64"));
            const encryptedDataBuffer = encryptedObject.data;
            const encryptedDataBase64 = Buffer.from(encryptedDataBuffer).toString("base64");
            
            response.send(encryptedDataBase64);
        }
        else
        {
            const responseToSend =
            {
                status : statusCodes.FORBIDDEN,
                message: "Do not have the necessary read privilege!!"
            }

            const responseToSendString = JSON.stringify(responseToSend);
            const responseToSendBuffer = Buffer.from(responseToSendString, "utf-8");
             
            const encryptedObject = Encryption.aes(responseToSendBuffer, Buffer.from(serverSideSession.aesKey, "base64"), Buffer.from(serverSideSession.aesInitialVector, "base64"));
            const encryptedDataBuffer = encryptedObject.data;
            const encryptedDataBase64 = Buffer.from(encryptedDataBuffer).toString("base64");

            response.send(encryptedDataBase64);
        }

    }
    else
    {
        const responseToSend =
        {
            status : statusCodes.UNAUTHORIZED,
            message: "Someone being SUS!!"
        }
        response.json(responseToSend);
    }
}