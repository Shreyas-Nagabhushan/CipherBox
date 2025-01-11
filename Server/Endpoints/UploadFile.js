import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import { validateSession } from "../../Common/Utility/ValidateSession.js";

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
            if(fileSystemEntryType == filesystemEntryType.DIRECTORY)
            {
                //Create directory 
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