const dgram = require("dgram");

class ServerBrowser
{
    constructor()
    {
        this.socket = null;
        this.findServers();
    }

    findServers()
    {
        this.socket = dgram.createSocket("udp4");

        const onSocketSent = (error) => 
        {
            if (error) 
            {
                console.error(error);
                return;
            }

            console.log("Broadcast message sent");
        }

        const onSocketBind = () => 
        {
            this.socket.setBroadcast(true);
            this.socket.send("DISCOVER_SERVERS", 3001, "255.255.255.255", onSocketSent);
        }

        this.socket.bind(onSocketBind);

        this.socket.on("message", (message, remoteInfo) => 
        {
            console.log(`Server found at ${remoteInfo.address}:${remoteInfo.port} - ${message}`);
        });
    }

}

export default ServerBrowser;