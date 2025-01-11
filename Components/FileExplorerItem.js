import Client from '../Client/Client.js';
import { filesystemEntryType } from '../Common/Constants/FilesystemEntryType.js';

const path = require('path');

class FileExplorerItem extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(metadata)
    {
        this.metadata = metadata;
        this.iconPath = "";

        switch(metadata.type)
        {
            case filesystemEntryType.DIRECTORY:
                this.iconPath = "./assets/Icons/ExplorerFolderIcon.png"
                break;

            case filesystemEntryType.FILE:
                break;
        }
    }

    connectedCallback()
    {
        this.style.padding = "1em";
        this.style.color = "white";
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.alignItems = "center";
        this.style.width = "64px";

        this.innerHTML = `
            <div style="flex:1;">
                <img src="${this.iconPath}" width="32" height="32">
            </div>
            <div style="flex: 1; font-size: 12px; overflow: visible; width: 100%;text-align: center; overflow: visible; word-wrap: break-word;">
                ${this.metadata.name}
            </div>
        `;

        this.addEventListener("dblclick", async ()=>
        {
            const responseJson = await fetch
            (
                `http://${Client.ipWithPort}/keyExchange`,
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify
                    ({
                        relativePath: this.metadata.relativePath,
                    })
                },
            )
            // this.app.post("/readFile", (request, response)=>{ handleReadFile(request, response, this); });

        });
    }
}

customElements.define("file-explorer-item", FileExplorerItem);
export default FileExplorerItem;