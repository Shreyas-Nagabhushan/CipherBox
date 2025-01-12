
import { paths } from '../Common/Globals.js';
import Logging from './Logging/Logging.js';
import FileSystemEntryMetadata from '../Common/Files/FileSystemEntryMetadata.js';
import FileExplorer from '../Components/FileExplorer.js';
import { filesystemEntryType } from '../Common/Constants/FilesystemEntryType.js';
import FileSystemTree from '../Common/Files/FileSystemTree.js';
import { createFileSystemTreeServer } from '../Common/Utility/CreateFileSystemTree.js';
import { getUsersFromStorage } from '../Common/Utility/GetUsersFromStorage.js';
import { logMessageType } from '../Common/Constants/LogMessageType.js';
import { statusCodes } from '../Common/Constants/StatusCodes.js';
import { handleRootEndpoint } from './Endpoints/RootEndpoint.js';
import { handleDownloadFile } from './Endpoints/DownloadFile.js';
import { handleUploadFile } from './Endpoints/UploadFile.js';
import { handleKeyExchange } from './Endpoints/KeyExchange.js';
import { handleReadFile } from './Endpoints/ReadFile.js';
import { handleWriteFile } from './Endpoints/WriteFile.js';


const express = require('express');
const fs = require("fs");
const dgram = require('dgram');
const path = require('path');

class Server
{
    constructor(name = "Untitled Server", port = 3005)
    {
        this.fileServerPort = port;
        this.broadcastListenerPort = port + 1;
        this.app = express();
        this.app.use(express.json());
        this.app.set('trust proxy', true);
        this.name = name;
        this.server = null;
        this.broadcastListenerServer = null;
        this.activeConnections = 0;
        this.isRunning = false;
        this.usersList = getUsersFromStorage();
        this.clientsInQueue = {}; //{ <username> : <ip> } 
        this.sessions = {}; //{ <ip> : <session object> }
        this.fileSystemTree = null;

        Logging.initialize(paths["logsDirectory"]);

        console.log("Created a new Server object.");
    }

    startFileServer()
    {
        this.server = this.app.listen(this.fileServerPort, () => 
        {
            Logging.log(`Server is running on http://localhost:${this.fileServerPort}`);
            this.isRunning = true;
        });
        
        this.server.on('connection', (socket) => 
        {
            this.activeConnections++;

            Logging.log(`A client from ${socket.remoteAddress}has connected to the server.`, logMessageType.SUCCESS);
            
            socket.on('close', () => 
            {
                this.activeConnections--;
            });

        });
        

        this.app.post("/", (request, response)=>{ handleRootEndpoint(request, response, this); });
        this.app.post("/keyExchange", (request, response)=>{ handleKeyExchange(request, response, this); });
        this.app.post("/readFile", (request, response)=>{ handleReadFile(request, response, this); });
        this.app.post("/downloadFile", (request, response)=>{ handleDownloadFile(request, response, this); });
        this.app.post("/uploadFile", (request, response)=>{ handleUploadFile(request, response, this); });

        this.listenForBroadcastRequests();
    }


    listenForBroadcastRequests()
    {
        this.broadcastListenerServer = dgram.createSocket('udp4');

        this.broadcastListenerServer.on("message", (message, remoteInfo) => 
        {
            const serverInfo = this.getServerInfoJson();
            const serverInfoAsString = JSON.stringify(serverInfo);
            Logging.log("Broadcast request recieved from " + String(remoteInfo.address) + " on " + String(remoteInfo.port), logMessageType.WARNING);
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

            Logging.log("Server stopped!", logMessageType.WARNING);
        }
    }

}

export default Server;