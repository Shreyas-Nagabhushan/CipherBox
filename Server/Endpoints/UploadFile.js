import { encryptionAlgorithm } from "../../Common/Constants/EncryptionAlgorithm.js";
import { filesystemEntryType } from "../../Common/Constants/FilesystemEntryType.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import Encryption from "../../Common/EncryptionDecryption/Encryption.js";
import FileSystemEntryMetadata from "../../Common/Files/FileSystemEntryMetadata.js";
import FileSystemTree from "../../Common/Files/FileSystemTree.js";
import FileSystemTreeNode from "../../Common/Files/FileSystemTreeNode.js";
import { paths } from "../../Common/Globals.js";
import { createFileSystemTreeServer } from "../../Common/Utility/CreateFileSystemTree.js";
import { validateSession } from "../../Common/Utility/ValidateSession.js";
import Logging from "../Logging/Logging.js";

const fs = require("fs");
const path = require("path");

export function handleUploadFile(request, response, server)
{
    //request body: { sessionToken, relativePath, fileSystemEntryType, content }

    const bValidSession = validateSession(request,server);

    const clientIp = request.ip; 
    const serverSideSession = server.sessions[clientIp];

    if(bValidSession)
    {
        const body = request.body; 
        const relativePath = body["relativePath"]; 
        const content = body.content || "";

        console.log("Content retrieved");

        if(true)// TODO : Check privilege level  
        {
            const fileSystemTree = server.fileSystemTree; 

            if(body["fileSystemEntryType"]  == filesystemEntryType.DIRECTORY)
            {
                //Create directory 
                fs.mkdirSync(path.join(paths["filesDirectory"], relativePath));
                console.log("Received a directory");

                fileSystemTree.current = fileSystemTree.root;
                const normalizedPath = path.normalize(relativePath);
                const pathSegments = normalizedPath.split(path.sep); 

                for(const pathSegment of pathSegments) 
                {
                    fileSystemTree.navigate(pathSegment);
                }

                fileSystemTree.current.childrenDirectories.push(new FileSystemTreeNode(new FileSystemEntryMetadata(relativePath), fileSystemTree.current, [], []));

                fileSystemTree.current = fileSystemTree.root;

                //fileSystemTree.save();

                const responseToSend = 
                {
                    status: statusCodes.OK, 
                    fileSystemTree: fileSystemTree.toJson()
                }; 
                response.json(responseToSend);
                return;
                
            }
            else 
            {
                //Create file
                const fullPath = path.join(paths["filesDirectory"], relativePath);
                fs.writeFileSync(fullPath, content, { encoding: "base64"});

                fileSystemTree.current = fileSystemTree.root;
                const normalizedPath = path.normalize(relativePath);
                const pathSegments = normalizedPath.split(path.sep); 

                for(const pathSegment of pathSegments) 
                {
                    fileSystemTree.navigate(pathSegment);
                }

                fileSystemTree.current.files.push(new FileSystemEntryMetadata(relativePath));
                fileSystemTree.current = fileSystemTree.root;

                Logging.log("File uploaded successfully at: " + fullPath);

                const responseToSend = 
                {
                    status: statusCodes.OK, 
                    fileSystemTree: fileSystemTree.toJson()
                }; 

                const responseString = JSON.stringify(responseToSend);
                const responseBuffer = Buffer.from(responseString, "utf-8");

                const encryptedDataObject = Encryption.aes(responseBuffer, Buffer.from(serverSideSession.aesKey, "base64"), Buffer.from(serverSideSession.aesInitialVector, "base64"));
                const encryptedDataBase64 = encryptedDataObject.data.toString("base64");

                response.send(encryptedDataBase64);
                return;

            }

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
    else 
    {
        const responseToSend = 
        {
            status: statusCodes.UNAUTHORIZED, 
            message: "Unauthorized User"
        }; 
        response.json(responseToSend);
    }
}