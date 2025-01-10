import { fileExtensions } from "../Constants/FileExtensions.js";
import { paths } from "../Globals.js";

const path = require("path");


//Input is the directory in which the .cboxsv file is present
export function setupGlobalPathsForServerFile(serverPath, serverName) 
{
    paths["serverFile"]= path.join(serverPath, (serverName + fileExtensions.SERVER_FILE));
    paths["logsDirectory"] = path.join(serverPath, "Logs");
    paths["filesDirectory"] = path.join(serverPath, "Files");
    paths["usersDirectory"] = path.join(serverPath, "Users");
}