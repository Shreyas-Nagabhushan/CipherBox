const express = require('express');
const fs = require("fs");
const dgram = require('dgram');

class Server
{
    constructor(port = 3000)
    {
        this.fileServerPort = port;
        this.broadcastRequestListenerPort = port + 1;
        this.app = express();
        this.app.use(express.json());


        this.startFileServer();
        this.listenForBroadcastRequests();
    }

    startFileServer()
    {
        this.app.listen(this.fileServerPort, () => 
        {
            console.log(`Server is running on http://localhost:${this.fileServerPort}`);
        });
    }

    listenForBroadcastRequests()
    {
        const server = dgram.createSocket('udp4');

        server.on("message", (message, remoteInfo) => 
        {
            if (message.toString() === "DISCOVER_SERVERS") 
            {
                server.send("SERVER_RESPONSE", remoteInfo.port, remoteInfo.address);
            }
        });

        server.bind(this.broadcastRequestListenerPort);
    }


}

export default Server;