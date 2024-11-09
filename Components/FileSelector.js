import { selectionModes } from "../Common/Constants/SelectionModes.js";
import { theme } from "../Common/Constants/Theme.js";
import { openFolderSelectionDialog } from "../Common/Utility/OpenFolderSelectionDialog.js";

class FileSelector extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(selectionMode, defaultPath)
    {
        this.selectionMode = selectionMode;
        this.defaultPath = defaultPath;
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
                    border: solid white 2px;
                    border-radius: 5px;
                    box-sizing: border-box;
                    color: white;
                    background-color: ${theme.secondaryBackgroundColor};
                }
                .choose-file-button
                {
                    flex: 1;
                }
            </style>
            <input type="text" class="file-path-text-box" readonly></div>
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
                    filePathTextBox.value = selectedFolderPath;
                    break;
            }
        });
    }
}

customElements.define("file-selector", FileSelector);
export default FileSelector;