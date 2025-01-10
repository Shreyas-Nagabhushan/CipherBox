import Logging from "../Logging/Logging.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import { createFileSystemTreeServer } from "../../Common/Utility/CreateFileSystemTree.js";

export function handleRootEndpoint(request, response, server)
{
    //TODO: Decryption of username and password
    const username = request.body.username;
    const password = request.body.password;

    const ipAddress = request.ip;
    const port = request.connection.remotePort;
    
    let bValidDetails = false;
    
    if(username in server.usersList)
    {
        if(server.usersList[username].password === password)
        {
            bValidDetails = true;
        }
    }

    if(bValidDetails)
    {
        // const fileSystemTree = createFileSystemTreeServer();
        // const fileSystemTreeJson = fileSystemTree.toJson();
        server.clientsInQueue[username] = ipAddress +':'+ port;
        response.json({ status: statusCodes.OK});
        const timeout = 3000;
        setTimeout(()=>{ delete server.clientsInQueue[username]; }, timeout);

        // Logging.log("Sending :" + JSON.stringify(fileSystemTreeJson));
    }
    else
    {
        response.json({ status: statusCodes.UNAUTHORIZED, message: "Access Denied." });
        Logging.log("Access Denied.");
    } 



}
