import FileSystemEntryMetadata from "../Common/Files/FileSystemEntryMetadata.js";
import { paths } from "../Common/Globals.js";
import "./FileExplorerItem.js"

const fs = require('fs');
const path = require('path');

class FileExplorer extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(baseDirectory)
    {
        this.baseDirectory = baseDirectory;
        this.currentWorkingDirectory = baseDirectory;
    }

    static iterateDirectory(directoryPath, bRecursive = false) 
    {
        const files = fs.readdirSync(directoryPath); 
        const result = [];

        files.forEach((file) => 
        {
            const fullPath = path.join(directoryPath, file);
            const stats = fs.statSync(fullPath);
            const fileMetaData = new FileSystemEntryMetadata(fullPath);

            //If file type isn't supported, it will show up as null
            if(fileMetaData.type != null)
            {
                result.push(fileMetaData);
            }
            
            if (stats.isDirectory()) 
            {
                if(bRecursive)
                {
                    result.push(...FileExplorer.iterateDirectory(fullPath));
                }
            } 

        });

        return result;
    }

    changeDirectory(newDirectory)
    {
        this.currentWorkingDirectory = newDirectory;
        const container = this.querySelector(".files-container");
        container.innerHTML = ``;

        this.fileExplorerPathDisplay.changeDirectory(newDirectory);

        const files = FileExplorer.iterateDirectory(newDirectory);
        
        for(const file of files)
        {
            const fileWidget = document.createElement("file-explorer-item");
            fileWidget.initialize(this, file);
            container.appendChild(fileWidget);
        }

    }

    connectedCallback()
    {
        this.style.width = "100%";
        
        this.innerHTML = `
            <style>
                file-explorer-path-display-item
                {
                    display:inline-flex;
                    background-color: #1f1f1f;
                    padding: 10px;
                    margin: 5px;
                    color: white;
                    font-size: 12px;
                    user-select: none;
                    box-sizing: border-box;
                    border: solid white 1px;
                    border-radius: 5px;
                }
                file-explorer-path-display-item:hover
                {
                    background-color: gray;
                }
                file-explorer-item:hover
                {
                    background-color: gray;
                    border-radius: 10px;
                }
            </style>
            <file-explorer-path-display base-directory="${this.baseDirectory? this.baseDirectory: paths["filesDirectory"]}">
            </file-explorer-path-display>
            <div class="files-container" style="display:flex;flex-wrap: wrap;">
            </div>
        `;

        this.fileExplorerPathDisplay = this.querySelector("file-explorer-path-display");
        // this.changeDirectory(FILE_EXPLORER_TESTING_PATH);
    }
}

customElements.define("file-explorer", FileExplorer);
export default FileExplorer;