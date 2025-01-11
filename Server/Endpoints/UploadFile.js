import { filesystemEntryType } from "../../Common/Constants/FilesystemEntryType.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import FileSystemEntryMetadata from "../../Common/Files/FileSystemEntryMetadata.js";
import FileSystemTree from "../../Common/Files/FileSystemTree.js";
import FileSystemTreeNode from "../../Common/Files/FileSystemTreeNode.js";
import { paths } from "../../Common/Globals.js";
import { createFileSystemTreeServer } from "../../Common/Utility/CreateFileSystemTree.js";
import { validateSession } from "../../Common/Utility/ValidateSession.js";

const fs = require("fs");
const path = require("path");

export function handleUploadFile(request, response, server)
{
    //request body: { sessionToken, relativePath, fileSystemEntryType, content }

    const bValidSession = validateSession(request,server);

    if(bValidSession)
    {
        const body = request.body; 
        const relativePath = body["relativePath"]; 

        if(true)// TODO : Check privilege level  
        {
            const fileSystemTree = server.fileSystemTree; 

            if(body["fileSystemEntryType"]  == filesystemEntryType.DIRECTORY)
            {
                //Create directory 
                fs.mkdirSync(path.join(paths["filesDirectory"], relativePath));

                fileSystemTree.current = fileSystemTree.root;
                const normalizedPath = path.normalize(relativePath);
                const pathSegments = normalizedPath.split(path.sep); 

                for(const pathSegment of pathSegments) 
                {
                    fileSystemTree.navigate(pathSegment);
                }

                fileSystemTree.current.childrenDirectories.push(new FileSystemTreeNode(new FileSystemEntryMetadata(relativePath), fileSystemTree.current, [], []));

                fileSystemTree.current = fileSystemTree.root;

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
            }

            const responseToSend = 
            {
                status: statusCodes.OK
            }; 
            response.json(responseToSend);
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