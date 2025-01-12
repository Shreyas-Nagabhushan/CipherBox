import Logging from "../../Server/Logging/Logging.js";
import { fileExtensions } from "../Constants/FileExtensions.js";
import { paths } from "../Globals.js";
import { createFileSystemTreeServer } from "./CreateFileSystemTree.js";

const path = require("path");
const fs = require("fs");

export function createServerFile(serverDirectory, serverName, rootDirectoryUploadPrivilege)
{
    console.log("Server Directory: " + serverDirectory);
    console.log("Server Name: " + serverName);

    if(!serverName)
    {
        return false;
    }

    //If server already exists with the same name in same directory, then name is invalid
    if(fs.existsSync(path.join(serverDirectory, serverName)))
    {
        return false;
    }

    const serverPath = path.join(serverDirectory, serverName);
    fs.mkdirSync(serverPath);

    const serverFilePath = path.join(serverPath, (serverName + fileExtensions.SERVER_FILE));
    fs.writeFileSync(serverFilePath, "");
    paths["serverFile"] = serverFilePath;

    fs.mkdirSync(path.join(serverPath, "Logs"));
    paths["logsDirectory"] = path.join(serverPath, "Logs");

    fs.mkdirSync(path.join(serverPath, "Files"));
    paths["filesDirectory"] = path.join(serverPath, "Files");

    fs.mkdirSync(path.join(serverPath, "Users"));
    paths["usersDirectory"] = path.join(serverPath, "Users");

    const fileSystemTree = createFileSystemTreeServer(rootDirectoryUploadPrivilege);
    fileSystemTree.save();
    
    console.log("paths[filesDirectory]: " + paths["filesDirectory"]);
    console.log("serverPath: " + serverPath);

    return true;
}


