const dgram = require("dgram");

class ServerBrowser
{
    constructor()
    {
        this.socket = null;
        this.findServers();
    }

    findServers(portRangeStart = 3001, portRangeEnd=3001)
    {
        this.socket = dgram.createSocket("udp4");

        const onSocketSent = (error) => 
        {
            if (error) 
            {
                console.error(error);
                this.socket.setBroadcast(false);
                return;
            }

            console.log("Broadcast message sent");
            this.socket.setBroadcast(false);
        }

        const onSocketBind = () => 
        {
            this.socket.setBroadcast(true);
            
            for(let currentPort = portRangeStart ; currentPort <= portRangeEnd ; currentPort++)
            {
                this.socket.send("DISCOVER_SERVERS", currentPort, "255.255.255.255", onSocketSent);
            }
        }

        this.socket.bind(onSocketBind);

        this.socket.on("message", (message, remoteInfo) => 
        {
            console.log(`Server found at ${remoteInfo.address}:${remoteInfo.port} - ${message}`);
        });
    }

}

export default ServerBrowser;