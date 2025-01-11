import Client from "../Client/Client.js";
import { filesystemEntryType } from "../Common/Constants/FilesystemEntryType.js";
import { selectionModes } from "../Common/Constants/SelectionModes.js";
import FileSelector from "../Components/FileSelector.js";

class UploadFileInterface extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        this.innerHTML = `
            <div class="upload-file-container">
                <h1 align="center">Upload File</h1>
                <input type="number" class="read-privilege-level-text-box" placeholder="Enter Read Privilege Level..." min="0" step="1">
                <input type="number" class="download-privilege-level-text-box" placeholder="Enter Download Privilege Level..." min="0" step="1">

            </div>

            <div class="control-panel">
                <button class="upload-file-button">
                    Upload
                </button>
            </div>

        `;

        const uploadFileContainer = this.querySelector(".upload-file-container");
        const fileSelector = document.createElement("file-selector");

        if(fileSelector instanceof FileSelector)
        {
            fileSelector.initialize(selectionModes.FILE, "File Name...");

        }
        uploadFileContainer.appendChild(fileSelector);

        const uploadButton = this.querySelector(".upload-file-button");
        uploadButton.addEventListener("click",async()=>
        {
            const uploadFileResponse = await fetch
            (
                `http://${Client.serverIpWithPort}/uploadFile`,
                {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify
                    ({
                        session: Client.session,
                        relativePath: this.relativePath,//How to get file absolute path when uploading
                        fileSystemEntryType: filesystemEntryType.FILE
                    }),
                }
            )
        });
    }
}

customElements.define("upload-file-interface", UploadFileInterface);
export default UploadFileInterface;