import Client from "../Client/Client.js";
import { encryptionAlgorithm } from "../Common/Constants/EncryptionAlgorithm.js";
import { filesystemEntryType } from "../Common/Constants/FilesystemEntryType.js";
import { statusCodes } from "../Common/Constants/StatusCodes.js";
import Decryption from "../Common/EncryptionDecryption/Decryption.js";
import EncryptedData from "../Common/EncryptionDecryption/EncryptedData.js";
import FileSystemEntryMetadata from "../Common/Files/FileSystemEntryMetadata.js";
import UploadFileInterface from "../Pages/UploadFileInterface.js";
import AlertComponent from "./AlertComponent.js";
class FileExplorerItemContextMenu extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(metadata)
    {
        this.metadata = metadata;
        
        document.querySelectorAll("file-explorer-item-context-menu").forEach((element)=>
        {
            element.remove();
        });
    }

    connectedCallback()
    {

        this.innerHTML = `
            <button class="download-button">Download</button>
            <button class="new-folder-button">Create New Folder</button>
        `;

        const downloadButton = this.querySelector(".download-button");
        const newFolderButton = this.querySelector(".new-folder-button");


        downloadButton.addEventListener("click", async ()=>
        {
            const downloadFileResponse = await fetch
            (
                `http://${Client.serverIpWithPort}/downloadFile`,
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify
                    ({
                        session: Client.session,
                        relativePath: this.metadata.relativePath,
                    })
                },
            );

            const responseText = await downloadFileResponse.text();
            const responseBuffer = Buffer.from(responseText, "base64");

            const decryptedDataBuffer = Decryption.decrypt(new EncryptedData(responseBuffer, Buffer.from(Client.session.aesKey, "base64"), null, Buffer.from(Client.session.aesInitialVector, "base64")), encryptionAlgorithm.AES);
            const decryptedJsonString = decryptedDataBuffer.toString("utf-8");
            const decryptedJson = JSON.parse(decryptedJsonString);

            if(decryptedJson["status"] == statusCodes.OK)
            {
                const filename = decryptedJson["filename"];
                const fileContentBase64 = decryptedJson["content"];
                const fileContent = Buffer.from(fileContentBase64, "base64");
    
                const blob = new Blob([fileContent], { type: "application/octet-stream" });
                
                const anchor = document.createElement('a');
                anchor.href = URL.createObjectURL(blob);
                anchor.download = filename
                anchor.style.display = 'none';

                document.body.appendChild(anchor);
                anchor.click();

                URL.revokeObjectURL(anchor.href);
                document.body.removeChild(anchor);

            }
            else
            {
                AlertComponent.alert(decryptedJson["message"]);
            }

        });
        newFolderButton.addEventListener("click",async ()=>
        {
            window.openPage("upload-file-interface", filesystemEntryType.DIRECTORY);
        });
        
        if(this.metadata instanceof FileSystemEntryMetadata)
        {
            switch(this.metadata.type)
            {
                case filesystemEntryType.DIRECTORY:
                {
                    downloadButton.style.display = "none";
                    break;
                }
                case filesystemEntryType.FILE:
                {
                    newFolderButton.style.display = "none";
                    break;
                }
            }
        }
       
        
       
    }
}

customElements.define("file-explorer-item-context-menu", FileExplorerItemContextMenu);
export default FileExplorerItemContextMenu;