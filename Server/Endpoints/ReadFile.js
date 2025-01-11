import { statusCodes } from "../../Common/Constants/StatusCodes.js";
import { validateSession } from "../../Common/Utility/ValidateSession.js";

export function handleReadFile(request, response, server)
{
    const dataReceived = request.body;
    const sessionJson = dataReceived.session;
    const relativePath = dataReceived.relativePath;
    const fileSystemTree = server.fileSystemTree;

    const bValidSesssion = validateSession(request,server);
    
    console.log("Relative path split of file: "+ relativePath.split("/"));

    if(true)
    {
        const userObject = server.usersList[sessionJson["username"]];
        const fileContent = fileSystemTree.getFileFromRelativePath(relativePath);

        const bValidSesssion = validateSession(request, server);

        //TODO: Encrypt response 

        console.log(fileContent);
        if(bValidSesssion)
        {
            //Send the file
            const responseToSend =
            {
                status : statusCodes.OK,
                fileContent: fileContent
            }
            response.json(responseToSend);
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