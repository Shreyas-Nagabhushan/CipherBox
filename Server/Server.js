
import { paths } from '../Common/Globals.js';
import Logging from './Logging/Logging.js';
import FileSystemEntryMetadata from '../Common/Files/FileSystemEntryMetadata.js';
import FileExplorer from '../Components/FileExplorer.js';
import { filesystemEntryType } from '../Common/Constants/FilesystemEntryType.js';
import FileSystemTree from '../Common/Files/FileSystemTree.js';
import { createFileSystemTreeServer } from '../Common/Utility/CreateFileSystemTree.js';

const express = require('express');
const fs = require("fs");
const dgram = require('dgram');
const path = require('path');

class Server
{
    constructor(name = "Untitled Server", logsDirectory = "", port = 3005)
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
        this.isRunning = false;

        Logging.initialize(logsDirectory);

        this.startFileServer();
        this.listenForBroadcastRequests();
    }

    startFileServer()
    {
        this.server = this.app.listen(this.fileServerPort, () => 
        {
            console.log(`Server is running on http://localhost:${this.fileServerPort}`);
            //Logging.log(`Server is running on http://localhost:${this.fileServerPort}`);
            this.isRunning = true;
        });
        
        this.server.on('connection', (socket) => 
        {
            this.activeConnections++;

            console.log(`A client from ${socket.remoteAddress}has connected to the server.`)

            Logging.log(`A client from ${socket.remoteAddress}has connected to the server.`);
            
            socket.on('close', () => 
            {
                this.activeConnections--;
            });

        });

        this.app.get("/", (request, response)=>
        {
            const fileSystemTree = createFileSystemTreeServer();
            const fileSystemTreeJson = fileSystemTree.toJson();
            response.json(fileSystemTreeJson);

            Logging.log("Sending :" + JSON.stringify(fileSystemTreeJson));

        });

    }

    listenForBroadcastRequests()
    {
        this.broadcastListenerServer = dgram.createSocket('udp4');

        this.broadcastListenerServer.on("message", (message, remoteInfo) => 
        {
            const serverInfo = this.getServerInfoJson();
            const serverInfoAsString = JSON.stringify(serverInfo);
            Logging.log("Broadcast request recieved from " + String(remoteInfo.address) + " on " + String(remoteInfo.port));
            this.broadcastListenerServer.send(serverInfoAsString, remoteInfo.port, remoteInfo.address);
        });

        this.broadcastListenerServer.bind(this.broadcastListenerPort);
    }

    getServerInfoJson()
    {
        return { fileServerPort: this.fileServerPort, name: this.name, activeConnections: this.activeConnections };
    }

    stopFileServer()
    {
        if(this.server)
        {
            this.server.close();
            this.broadcastListenerServer.close(()=>{});
            this.isRunning = false;

            Logging.log("Server stopped!");
        }
    }

}

export default Server;