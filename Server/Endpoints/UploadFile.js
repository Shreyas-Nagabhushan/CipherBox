import { encryptionAlgorithm } from "../../Common/Constants/EncryptionAlgorithm.js";
import { filesystemEntryType } from "../../Common/Constants/FilesystemEntryType.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import Encryption from "../../Common/EncryptionDecryption/Encryption.js";
import FileSystemEntryMetadata from "../../Common/Files/FileSystemEntryMetadata.js";
import FileSystemTree from "../../Common/Files/FileSystemTree.js";
import FileSystemTreeNode from "../../Common/Files/FileSystemTreeNode.js";
import Privilege from "../../Common/Files/Privilege.js";
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
        const username = serverSideSession.username;
        const user = server.usersList[username];
        

        const body = request.body; 
        const relativePath = body["relativePath"]; 
        const content = body.content || "";
        const filePrivilege = Privilege.fromJson(body["privilege"]);

        console.log("Content retrieved");

        console.log("FILE PRIVILEGE: ");
        console.log(filePrivilege);

        console.log("USER PRIVILEGE: ");
        console.log(user.privilege);

        
        

        const currentDirectoryMetaData = server.fileSystemTree.getDirectoryMetaDataFromRelativePath(relativePath);

        console.log("CURRENT DIRECTORY PRIVILEGE: ");
        console.log(currentDirectoryMetaData.privilege);    
        console.log(user.privilege.uploadPrivilege >= currentDirectoryMetaData.privilege.uploadPrivilege);

        if(user.privilege.uploadPrivilege >= currentDirectoryMetaData.privilege.uploadPrivilege)
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

                fileSystemTree.current.childrenDirectories.push(new FileSystemTreeNode(new FileSystemEntryMetadata(relativePath, filePrivilege), fileSystemTree.current, [], []));

                fileSystemTree.current = fileSystemTree.root;

                fileSystemTree.save();

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

                const fileSystemMetaData  = new FileSystemEntryMetadata(relativePath, filePrivilege)
                console.log(fileSystemMetaData);

                fileSystemTree.current.files.push(fileSystemMetaData);
                fileSystemTree.current = fileSystemTree.root;

                fileSystemTree.save();
                
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