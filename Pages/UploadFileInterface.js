import Client from "../Client/Client.js";
import { encryptionAlgorithm } from "../Common/Constants/EncryptionAlgorithm.js";
import { filesystemEntryType } from "../Common/Constants/FilesystemEntryType.js";
import { selectionModes } from "../Common/Constants/SelectionModes.js";
import { statusCodes } from "../Common/Constants/StatusCodes.js";
import Decryption from "../Common/EncryptionDecryption/Decryption.js";
import EncryptedData from "../Common/EncryptionDecryption/EncryptedData.js";
import FileSystemTree from "../Common/Files/FileSystemTree.js";
import Privilege from "../Common/Files/Privilege.js";
import { paths } from "../Common/Globals.js";
import AlertComponent from "../Components/AlertComponent.js";
import FileSelector from "../Components/FileSelector.js";

const path = require("path");
const fs = require("fs");

class UploadFileInterface extends HTMLElement
{
    constructor()
    {
        super();
    }
    initialize(uploadType)
    {     
        this.uploadType = uploadType;

        document.querySelectorAll("file-explorer-item-context-menu").forEach((element)=>
        {
            element.remove();
        });
    }
    connectedCallback()
    {
        this.innerHTML = `
            <div class="upload-file-container">
                <h1 align="center">Upload File</h1>
                <input type="number" class="read-privilege-level-text-box" placeholder="Enter Read Privilege Level..." min="0" step="1" value="0">
                <input type="number" class="download-privilege-level-text-box" placeholder="Enter Download Privilege Level..." min="0" step="1" value="0">
                <input type="number" class="upload-privilege-level-text-box" placeholder="Enter Upload Privilege Level..." min="0" step="1" value="0">

            </div>

            <div class="control-panel">
                <button class="upload-file-button">
                    Upload
                </button>
            </div>

        `;

        const uploadFileContainer = this.querySelector(".upload-file-container");
        const fileSelector = this.uploadType == filesystemEntryType.FILE ? document.createElement("file-selector"): document.createElement("input");

        if(fileSelector instanceof FileSelector)
        {
            if(this.uploadType == filesystemEntryType.FILE)
            {
                fileSelector.initialize(selectionModes.FILE, "File Name...");
                const uploadFilePrivilegeInput = this.querySelector(".upload-privilege-level-text-box");
                uploadFilePrivilegeInput.style.display = "none";
            }
            else // It will be a directory.
            {
                fileSelector.type = "text";
                fileSelector.placeholder = "Enter the folder name...";
            }

        }
        uploadFileContainer.appendChild(fileSelector);

        const uploadButton = this.querySelector(".upload-file-button");

        uploadButton.addEventListener("click", async()=>
        {
            const fileAbsolutePath = fileSelector.value;

            const filename = path.basename(fileAbsolutePath);

            const fileContent = this.uploadType == filesystemEntryType.FILE ? fs.readFileSync(fileAbsolutePath, { encoding:'base64' }): null;

            const relativePath = path.join(Client.fileSystemTree.current.fileSystemMetaData.relativePath, filename);
            
            const readPrivilege = parseInt(this.querySelector(".read-privilege-level-text-box").value);
            const downloadPrivilege = parseInt(this.querySelector(".download-privilege-level-text-box").value);
            const uploadPrivilege = parseInt(this.querySelector(".upload-privilege-level-text-box").value);

            //TODO: Encrypt the response 
            const uploadFileResponse = await fetch
            (
                `http://${Client.serverIpWithPort}/uploadFile`,
                {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify
                    ({
                        session: Client.session,
                        relativePath: relativePath,
                        fileSystemEntryType: this.uploadType, 
                        content: fileContent,
                        privilege: new Privilege(readPrivilege, downloadPrivilege, uploadPrivilege).toJson()
                    }),
                }
            );

            const responseText = await uploadFileResponse.text();
            const responseBuffer = Buffer.from(responseText, "base64");

            const decryptedDataBuffer = Decryption.decrypt(new EncryptedData(responseBuffer, Buffer.from(Client.session.aesKey, "base64"), null, Buffer.from(Client.session.aesInitialVector, "base64")), encryptionAlgorithm.AES);
            const decryptedJsonString = decryptedDataBuffer.toString("utf-8");
            const decryptedJson = JSON.parse(decryptedJsonString);

            if(decryptedJson["status"] == statusCodes.OK)
            {
                const newTreeJson = decryptedJson["fileSystemTree"];
                Client.fileSystemTree = FileSystemTree.fromJson(newTreeJson);
                console.log(Client.fileSystemTree);
                window.pop();

                Client.fileSystemTree.current = Client.fileSystemTree.root;
                const normalizedPath = path.dirname(path.normalize(relativePath));
                const pathSegments = normalizedPath.split(path.sep); 

                for(const pathSegment of pathSegments) 
                {
                    Client.fileSystemTree.navigate(pathSegment);
                }

                const fileExplorer = window.navigationStack[window.navigationStackPointer].querySelector("file-explorer");
                fileExplorer.initialize(Client.fileSystemTree);
                fileExplorer.refresh();
            }
            else
            {
                AlertComponent.alert(decryptedJson["message"]);
            }

        });
    }
}

customElements.define("upload-file-interface", UploadFileInterface);
export default UploadFileInterface;