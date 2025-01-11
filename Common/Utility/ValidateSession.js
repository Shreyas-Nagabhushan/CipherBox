import { session } from "electron";

export function validateSession(request,server)
{

    const sessionJson = request.body.session;
    const clientIp = request.ip; 
    const port = request.connection.remotePort; 

    const clientIpPort = clientIp + ':' + port; 

    if(server.sessions[clientIpPort] )
    {
        const serverSideSession = server.sessions[clientIpPort];
        if(serverSideSession["sessionToken"] == sessionJson["sessionToken"] &&
            serverSideSession["sessionStartTime "] == sessionJson["sessionStartTime"])
        {
            return true;
        }
        else
        {
            console.log("Somebody is being sus");

            return false;
        }
    }
    else
    {
        console.log("Unable to read session port at all!!");
        return false;
    }
}