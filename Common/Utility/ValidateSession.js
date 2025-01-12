
export function validateSession(request,server)
{

    const sessionJson = request.body.session;
    const clientIp = request.ip; 

    if(server.sessions[clientIp])
    {
        const serverSideSession = server.sessions[clientIp];

        if(serverSideSession["sessionStartTime"] == sessionJson["sessionStartTime"] &&  serverSideSession["sessionToken"] == sessionJson["sessionToken"])
        {
            console.log("Valid session!"); 
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
        console.log("Session not stored");
        return false;
    }
}