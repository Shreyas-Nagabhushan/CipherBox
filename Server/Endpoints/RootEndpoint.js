import Logging from "../Logging/Logging.js";
import { statusCodes } from "../../Common/Constants/StatusCodes.js";

export function handleRootEndpoint(request, response, server)
{
    //TODO: Decryption of username and password
    const username = request.body.username;
    const password = request.body.password;

    const ipAddress = request.ip;
    
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
        server.clientsInQueue[username] = ipAddress;

        response.json({ status: statusCodes.OK});
        const timeout = 3000;
        setTimeout(()=>{ delete server.clientsInQueue[username]; }, timeout);

    }
    else
    {
        response.json({ status: statusCodes.UNAUTHORIZED, message: "Access Denied." });
        Logging.log(`Wrong Credentials for ${username} from ${ipAddress}:${port}`);
    } 



}
