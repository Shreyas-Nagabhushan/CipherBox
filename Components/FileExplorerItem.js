import { filesystemEntryType } from '../Common/Constants/FilesystemEntryType.js';

const path = require('path');

class FileExplorerItem extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(fileExplorerRef, metadata)
    {
        this.fileExplorerRef = fileExplorerRef;
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

        this.addEventListener("dblclick", (event)=>
        {
            if(this.metadata.type == fileType.FOLDER)
            {
                this.fileExplorerRef.changeDirectory(path.join(this.fileExplorerRef.currentWorkingDirectory, this.metadata.name));
            }
        });
    }
}

customElements.define("file-explorer-item", FileExplorerItem);
export default FileExplorerItem;