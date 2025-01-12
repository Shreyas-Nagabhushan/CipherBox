import Client from "../Client/Client.js";
import { encryptionAlgorithm } from "../Common/Constants/EncryptionAlgorithm.js";
import { filesystemEntryType } from "../Common/Constants/FilesystemEntryType.js";
import { statusCodes } from "../Common/Constants/StatusCodes.js";
import Decryption from "../Common/EncryptionDecryption/Decryption.js";
import EncryptedData from "../Common/EncryptionDecryption/EncryptedData.js";

class FileExplorerItemContextMenu extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(fileExplorerItem)
    {
        this.fileExplorerItem = fileExplorerItem;
        
        document.querySelectorAll("file-explorer-item-context-menu").forEach((element)=>
        {
            element.remove();
        });
    }

    connectedCallback()
    {

        this.innerHTML = `
            <button class="download-button">Download</button>
        `;

        const downloadButton = this.querySelector(".download-button");

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
                        relativePath: this.fileExplorerItem.metadata.relativePath,
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

    });

        if(this.fileExplorerItem.metadata.type != filesystemEntryType.FILE)
        {
            downloadButton.style.display = "none";
        }
    }
}

customElements.define("file-explorer-item-context-menu", FileExplorerItemContextMenu);
export default FileExplorerItemContextMenu;