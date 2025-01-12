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
    const bValidSession = validateSession(request,server);

    const user = server.sessions[request.ip];

    const clientIp = request.ip; 
    const serverSideSession = server.sessions[clientIp];

    if(bValidSession)
    {
        const currentFileMetaData = server.fileSystemTree.getFileMetaDataFromRelativePath(relativePath) ;

        if(user.privilege.downloadPrivilege >= currentFileMetaData.privilege.downloadPrivilege) //Privilage check
        {
            const body = request.body;
            const relativePath = body["relativePath"]; 
    
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
            response.json(responseToSend);

        }



    }
}