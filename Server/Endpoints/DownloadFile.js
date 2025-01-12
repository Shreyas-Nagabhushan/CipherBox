import { encryptionAlgorithm } from "../../Common/Constants/EncryptionAlgorithm.js";
import { filesystemEntryType } from "../../Common/Constants/FilesystemEntryType.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import Encryption from "../../Common/EncryptionDecryption/Encryption.js";
import FileSystemEntryMetadata from "../../Common/Files/FileSystemEntryMetadata.js";
import FileSystemTree from "../../Common/Files/FileSystemTree.js";
import FileSystemTreeNode from "../../Common/Files/FileSystemTreeNode.js";
import { paths } from "../../Common/Globals.js";
import { validateSession } from "../../Common/Utility/ValidateSession.js";

const fs = require("fs");
const path = require("path");

export function handleDownloadFile(request, response, server)
{
    const body = request.body;
    const bValidSession = validateSession(request,server);

    if(bValidSession)
    {
        const clientIp = request.ip; 
        const serverSideSession = server.sessions[clientIp];
    
        const username = serverSideSession.username;
        const user = server.usersList[username];

        const relativePath = body["relativePath"]; 
        const currentFileMetaData = server.fileSystemTree.getFileMetaDataFromRelativePath(relativePath) ;
        
        console.log("USER PRIVILEGE: ");
        console.log(user.privilege);

        console.log("FILE PRIVILEGE: ");
        console.log(currentFileMetaData.privilege);

        console.log("CURRENT FILE METADATA: ");
        console.log(currentFileMetaData);

        if(user.privilege.downloadPrivilege >= currentFileMetaData.privilege.downloadPrivilege)
        {
            const fullPath = path.join(paths["filesDirectory"], relativePath);
            const fileContent = fs.readFileSync(fullPath, { encoding: "base64" });
    
            const responseToSend = 
            {
                status: statusCodes.OK,
                content: fileContent,
                filename: path.basename(fullPath)
            }

            const responseString = JSON.stringify(responseToSend);
            const responseBuffer = Buffer.from(responseString, "utf-8");

            const encryptedDataObject = Encryption.aes(responseBuffer, Buffer.from(serverSideSession.aesKey, "base64"), Buffer.from(serverSideSession.aesInitialVector, "base64"));
            const encryptedDataBase64 = encryptedDataObject.data.toString("base64");

            response.send(encryptedDataBase64);
            return;
        }
        else
        {
            const responseToSend = 
            {
                status: statusCodes.FORBIDDEN, 
                message: "Forbidden Operation"
            }; 


            const responseString = JSON.stringify(responseToSend);
            const responseBuffer = Buffer.from(responseString, "utf-8");

            const encryptedDataObject = Encryption.aes(responseBuffer, Buffer.from(serverSideSession.aesKey, "base64"), Buffer.from(serverSideSession.aesInitialVector, "base64"));
            const encryptedDataBase64 = encryptedDataObject.data.toString("base64");

            response.send(encryptedDataBase64);

        }



    }
}