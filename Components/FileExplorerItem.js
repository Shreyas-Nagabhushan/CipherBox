import Client from '../Client/Client.js';
import { filesystemEntryType } from '../Common/Constants/FilesystemEntryType.js';
import FileExplorerItemContextMenu from './FileExplorerItemContextMenu.js';

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
                this.iconPath = "./assets/Icons/ExplorerFolderIcon.png";
                break;

            case filesystemEntryType.FILE:
                this.iconPath = "./assets/Icons/ExplorerFileIcon.png";
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
        this.style.height = "64px";

        this.innerHTML = `
            <div style="flex:1;">
                <img src="${this.iconPath}" width="32" height="32">
            </div>
            <div style="flex: 1; font-size: 12px; overflow: visible; width: 100%;text-align: center; overflow: visible; word-wrap: break-word;">
                ${this.metadata.name}
            </div>
        `;

        this.addEventListener("contextmenu", async (event)=>
        {
            event.preventDefault(); 
            event.stopPropagation();

            const mouseX = event.clientX; 
            const mouseY = event.clientY; 

            const customMenu = document.createElement("file-explorer-item-context-menu");

            customMenu.style.left = `${mouseX}px`;
            customMenu.style.top = `${mouseY}px`;
            customMenu.style.display = "block";
            customMenu.style.position = "fixed";
            customMenu.initialize(this.metadata);
            
            document.body.appendChild(customMenu);
            
        });
    }
}

customElements.define("file-explorer-item", FileExplorerItem);
export default FileExplorerItem;