import FileSystemEntryMetadata from "../Common/Files/FileSystemEntryMetadata.js";
import FileSystemTree from "../Common/Files/FileSystemTree.js";
import FileSystemTreeNode from "../Common/Files/FileSystemTreeNode.js";
import { paths } from "../Common/Globals.js";
import FileExplorerItem from "./FileExplorerItem.js";

const fs = require('fs');
const path = require('path');

class FileExplorer extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(tree)
    {
        if(tree instanceof FileSystemTree)
        {
            this.tree = tree;
        }
    }

    refresh()
    {
        
        const currentDirectories = this.tree.getChildDirectoriesInCurrentWorkingDirectory();
        const currentFiles = this.tree.getFilesInCurrentWorkingDirectory(); 
        const itemsContainer = this.querySelector(".items-container");

        itemsContainer.innerHTML = "";

        for(const currentDirectory of currentDirectories)
        {
            if(currentDirectory instanceof FileSystemTreeNode)
            {
                const fileExplorerItem = document.createElement("file-explorer-item");
                fileExplorerItem.initialize(currentDirectory.fileSystemMetaData);
                fileExplorerItem.addEventListener("dblclick", (event)=>
                {
                    this.tree.navigate(currentDirectory.fileSystemMetaData.name);       
                });
                itemsContainer.appendChild(fileExplorerItem);
            }
        }

        for(const currentFile of currentFiles)
        {
            if(currentFile instanceof FileSystemEntryMetadata)
            {
                const fileExplorerItem = document.createElement("file-explorer-item");
                fileExplorerItem.initialize(currentFile);
                fileExplorerItem.addEventListener("dblclick", (event)=>
                {
                    //TODO      
                });                
                itemsContainer.appendChild(fileExplorerItem);
            }
        }        
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div class="show-directory" style="padding: 10px; background-color: #333; color: white;">
                Current Directory: /
            </div>
            <div class="items-container" style="display: flex; flex-wrap: wrap; gap: 10px; padding: 10px; background-color: #222;">
            </div>
            
            
        `;
        const header = this.querySelector(".show-directory");
        const itemsContainer = this.querySelector(".items-container");
        const backButton = document.querySelector("back-button");
        this.refresh();
        //Add the listener here for the on-directory-change event and update the UI of the file explorer
        //Also handle double clicking directori
    }
    
}

customElements.define("file-explorer", FileExplorer);
export default FileExplorer;