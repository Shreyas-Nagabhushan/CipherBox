import { selectionModes } from "../Common/Constants/SelectionModes.js";
import { theme } from "../Common/Constants/Theme.js";
import { openFolderSelectionDialog } from "../Common/Utility/OpenFolderSelectionDialog.js";

class FileSelector extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(selectionMode, placeholder, defaultPath)
    {
        this.selectionMode = selectionMode;
        this.defaultPath = defaultPath;
        this.placeholder = placeholder;
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.backgroundColor = theme.primaryBackgroundColor;
        this.style.padding = "10px";
        
        this.innerHTML = 
        `
            <style>
                .file-path-text-box
                {
                    flex: 3;
                }
                .choose-file-button
                {
                    flex: 1;
                }
            </style>
            <input type="text" class="file-path-text-box" placeholder="${this.placeholder}"></div>
            <button class="choose-file-button">...</button>
        `;

        const chooseFileButton = this.querySelector(".choose-file-button");
        const filePathTextBox = this.querySelector(".file-path-text-box");
        
        filePathTextBox.value = this.defaultPath;

        chooseFileButton.addEventListener("click", async(event) => 
        {
            switch(this.selectionMode)
            {
                case selectionModes.FILE:
                    break;
                case selectionModes.FOLDER:
                    const selectedFolderPath = await openFolderSelectionDialog();
                    this.value = selectedFolderPath;
                    filePathTextBox.value = selectedFolderPath;
                    break;
            }
        });
    }
}

customElements.define("file-selector", FileSelector);
export default FileSelector;