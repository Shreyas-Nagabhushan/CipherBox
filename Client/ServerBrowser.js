const dgram = require("dgram");

class ServerBrowser
{
    constructor(onServersFindCallback = (serverList)=>{}, searchDuration = 1500)
    {
        this.socket = null;
        this.serverList = [];
        this.onServersFindCallback = onServersFindCallback;
        this.searchDuration = searchDuration;
    }

    findServers(portRangeStart = 3001, portRangeEnd=3001)
    {
        this.serverList = [];
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

            setTimeout(()=>{this.onServersFindCallback(this.serverList);}, this.searchDuration);
        }

        this.socket.bind(onSocketBind);

        this.socket.on("message", (message, remoteInfo) => 
        {
            const messageObject = JSON.parse(message.toString());
            this.serverList.push({name: messageObject.name, address: remoteInfo.address, port: messageObject.fileServerPort });
        });
    }

}

export default ServerBrowser;