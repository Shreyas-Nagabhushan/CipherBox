import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import { validateSession } from "../../Common/Utility/ValidateSession.js";

export function handleReadFile(request, response, server)
{
    const dataReceived = request.body;
    const sessionJson = dataReceived.session;
    const relativePath = dataReceived.relativePath;

    const bValidSesssion = validateSession(request,server);
   
    if(bValidSesssion)
    {
        const userObject = server.usersList[sessionJson["username"]];
        if(userObject["readPrivilege"] >= server.fileSystemTree.current )
        {
            //Send the file
            
        }
        else
        {
            const responseToSend =
            {
                status : statusCodes.FORBIDDEN,
                message: "Do not have the necessary read privilege!!"
            }
            response.json(responseToSend);
        }

    }
    else
    {
        const responseToSend =
        {
            status : statusCodes.UNAUTHORIZED,
            message: "Someone being SUS!!"
        }
        response.json(responseToSend);
    }
}