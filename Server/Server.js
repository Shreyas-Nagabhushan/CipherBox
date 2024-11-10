import Logging from './Logging/Logging.js';

const express = require('express');
const fs = require("fs");
const dgram = require('dgram');

class Server
{
    constructor(name = "Untitled Server", logsDirectory = "", port = 3000)
    {
        this.fileServerPort = port;
        this.broadcastListenerPort = port + 1;
        this.app = express();
        this.app.use(express.json());
        this.name = name;
        this.server = null;
        this.broadcastListenerServer = null;
        this.activeConnections = 0;
        this.logsDirectory = logsDirectory;

        this.startFileServer();
        this.listenForBroadcastRequests();
    }

    startFileServer()
    {
        this.server = this.app.listen(this.fileServerPort, () => 
        {
            console.log(`Server is running on http://localhost:${this.fileServerPort}`);
        });
        
        this.server.on('connection', (socket) => 
        {
            this.activeConnections++;

            socket.on('close', () => 
            {
                this.activeConnections--;
            });
        });

    }

    listenForBroadcastRequests()
    {
        this.broadcastListenerServer = dgram.createSocket('udp4');
        const lastResponded = new Map();

        this.broadcastListenerServer.on("message", (message, remoteInfo) => 
        {
            const serverInfo = this.getServerInfoJson();
            const serverInfoAsString = JSON.stringify(serverInfo);
            const clientKey = `${remoteInfo.address}:${remoteInfo.port}`;
            const now = Date.now();

            console.log("Message: " + message.toString())

            if (lastResponded.has(clientKey) && now - lastResponded.get(clientKey) < 5000)
            {
                return;
            }

            lastResponded.set(clientKey, now);

            Logging.log("Broadcast request recieved from " + String(remoteInfo.address) + " on " + String(remoteInfo.port));
            this.broadcastListenerServer.send(serverInfoAsString, remoteInfo.port, remoteInfo.address);
        });

        this.broadcastListenerServer.bind(this.broadcastListenerPort);
    }

    getServerInfoJson()
    {
        return { fileServerPort: this.fileServerPort, name: this.name, activeConnections: this.activeConnections };
    }


}

export default Server;