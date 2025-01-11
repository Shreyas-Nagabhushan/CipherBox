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
        const childDirectoriesInCurrentWorkingDirectory = this.tree.getChildDirectoriesInCurrentWorkingDirectory();
        const filesInCurrentWorkingDirectory = this.tree.getFilesInCurrentWorkingDirectory(); 
        const itemsContainer = this.querySelector(".items-container");

        itemsContainer.innerHTML = "";

        for(const childDirectory of childDirectoriesInCurrentWorkingDirectory)
        {
            if(childDirectory instanceof FileSystemTreeNode)
            {
                const fileExplorerItem = document.createElement("file-explorer-item");
                fileExplorerItem.initialize(childDirectory.fileSystemMetaData);
                fileExplorerItem.addEventListener("dblclick", (event)=>
                {
                    this.tree.navigate(childDirectory.fileSystemMetaData.name);       
                });
                itemsContainer.appendChild(fileExplorerItem);
            }
        }

        for(const currentFile of filesInCurrentWorkingDirectory)
        {
            if(currentFile instanceof FileSystemEntryMetadata)
            {
                const fileExplorerItem = document.createElement("file-explorer-item");
                fileExplorerItem.initialize(currentFile);
                fileExplorerItem.addEventListener("dblclick", (event)=>
                {
                    //TODO  (Suvan please paste the code here :)   )
                });                
                itemsContainer.appendChild(fileExplorerItem);
            }
        }        
    }

    applyStyles()
    {
        const fileExplorerHeader = this.querySelector(".file-explorer-header");
        const previousDirectoryContainer = this.querySelector(".previous-directory-container"); 
        const showDirectory = this.querySelector(".show-directory");
        const uploadButtonContainer = this.querySelector(".upload-button-container");
        const itemsContainer = this.querySelector(".items-container"); 

        this.style.display = "flex";
        this.style.flex = 1;
        this.style.flexDirection = "column";
        this.style.width = "100%";

        fileExplorerHeader.style.display = "flex";
        fileExplorerHeader.style.flex = 1;
        fileExplorerHeader.style.width = "100%";
        fileExplorerHeader.style.alignItems = "center";
        fileExplorerHeader.style.justifyContent = "space-evenly";

        previousDirectoryContainer.style.display = "flex";
        previousDirectoryContainer.style.flex = 1;
        previousDirectoryContainer.style.justifyContent = "center";
        previousDirectoryContainer.style.alignItems = "center";

        showDirectory.style.display = "flex";
        showDirectory.style.flex = 5;
        showDirectory.style.justifyContent = "center";
        showDirectory.style.alignItems = "center";

        uploadButtonContainer.style.display = "flex";
        uploadButtonContainer.style.flex = 1;
        uploadButtonContainer.style.justifyContent = "center";
        uploadButtonContainer.style.alignItems = "center";

        itemsContainer.style.display = "flex";
        itemsContainer.style.flex = 4;
        itemsContainer.style.width = "100%";
        itemsContainer.style.flexWrap = "wrap";
        itemsContainer.style.padding = "10px";
        itemsContainer.style.backgroundColor = "#222";
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div class="file-explorer-header">
                <div class="previous-directory-container" style="flex:1">
                    <button class="previous-directory-button"> <- </button>
                </div>
                <div class="show-directory" style="padding: 10px; background-color: #333; color: white;style="flex:1"">
                    Current Directory: /
                </div>
                <div class="upload-button-container" style="flex:1">
                    <button class="upload-button"> Upload </button>
                </div>
            </div>
            <div class="items-container">
            
            </div>
        `;

        this.applyStyles(); 

        const fileExplorerHeader = this.querySelector(".file-explorer-header");
        const previousDirectoryContainer = this.querySelector(".previous-directory-container"); 
        const showDirectory = this.querySelector(".show-directory");
        const uploadButtonContainer = this.querySelector(".upload-button-container");
        const itemsContainer = this.querySelector(".items-container");
        const previousDirectoryButton = this.querySelector(".previous-directory-button");

        previousDirectoryButton.addEventListener("click", ()=>
        {
            if(this.tree.current && this.tree.current.parentDirectory) 
            {
                console.log("Navigating up from:", this.tree.current.fileSystemMetaData.name);
                this.tree.goUp();
            } 
            else 
            {
                console.warn("No parent directory to navigate to.");
            }
        })

        this.refresh();

    
        //Add the listener here for the on-directory-change event and update the UI of the file explorer
        //Also handle double clicking directori
    }
    
}

customElements.define("file-explorer", FileExplorer);
export default FileExplorer;