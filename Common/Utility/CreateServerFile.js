import Logging from "../../Server/Logging/Logging.js";
import { paths } from "../Globals.js";

const path = require("path");
const fs = require("fs");

export function createServerFile(serverDirectory, serverName)
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

    const serverFilePath = path.join(serverPath, (serverName + ".cboxsv"));
    fs.writeFileSync(serverFilePath, "");

    fs.mkdirSync(path.join(serverPath, "Logs"));
    paths["logsDirectory"] = path.join(serverPath, "Logs");

    fs.mkdirSync(path.join(serverPath, "Files"));
    paths["filesDirectory"] = path.join(serverPath, "Files");

    
    console.log("paths[filesDirectory]: " + paths["filesDirectory"]);
    console.log("serverPath: " + serverPath);

    return true;
}


