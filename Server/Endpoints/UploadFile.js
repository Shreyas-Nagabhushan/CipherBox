import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import { validateSession } from "../../Common/Utility/ValidateSession.js";

export function handleUploadFile(request, response, server)
{
    //metadata: { relativePath, sessionToken }
    //Byte array with: [...metadataBytes, fileContentBytes...]

    const bValidSession = validateSession(request,server);

    if(bValidSession)
    {
        const body = request.body; 
        const relativePath = body["relativePath"]; 

        if(true)// TODO : Check privilege level  
        {
            const metadata = body["metadata"]; 

            if(true)
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