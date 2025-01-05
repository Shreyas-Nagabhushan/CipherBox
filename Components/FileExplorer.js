import FileSystemEntryMetadata from "../Common/Files/FileSystemEntryMetadata.js";
import FileSystemTree from "../Common/Files/FileSystemTree.js";
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

    initialize(tree)
    {
        if(!tree instanceof FileSystemTree)
        {
            this.tree = tree;
        }
    }


    connectedCallback()
    {
        this.innerHTML = `

        `;

        //Add the listener here for the on-directory-change event and update the UI of the file explorer
        //Also handle double clicking directori
    }
}

customElements.define("file-explorer", FileExplorer);
export default FileExplorer;