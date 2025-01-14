import Client from "../Client/Client.js";
import { encryptionAlgorithm } from "../Common/Constants/EncryptionAlgorithm.js";
import { filesystemEntryType } from "../Common/Constants/FilesystemEntryType.js";
import { selectionModes } from "../Common/Constants/SelectionModes.js";
import { statusCodes } from "../Common/Constants/StatusCodes.js";
import { theme } from "../Common/Constants/Theme.js";
import Decryption from "../Common/EncryptionDecryption/Decryption.js";
import EncryptedData from "../Common/EncryptionDecryption/EncryptedData.js";
import Encryption from "../Common/EncryptionDecryption/Encryption.js";
import FileSystemTree from "../Common/Files/FileSystemTree.js";
import Privilege from "../Common/Files/Privilege.js";
import { paths } from "../Common/Globals.js";
import { initializeStyles } from "../Common/InitializeStyles.js";
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
            <style>
                label
                {
                    display: inline;
                    width: 150px;
                    margin: auto;
                    size: 20px;
                }
                input { width: 200px;}
            </style>
            <div class="upload-file-container">
                <h1 align="center">Upload File</h1>
                <label class="read-privilege-component" >Read Privilege :
                    <input type="number" class="read-privilege-level-text-box read-privilege-component" placeholder="Enter Read Privilege Level..." min="0" step="1" value="0">
                </label><br>
                <label class="download-privilege-component">Download Privilege :                
                    <input type="number" class="download-privilege-level-text-box download-privilege-component" placeholder="Enter Download Privilege Level..." min="0" step="1" value="0">
                </label><br>
                <label class="upload-privilege-component">Upload Privilege :    
                    <input type="number" class="upload-privilege-level-text-box upload-privilege-component" placeholder="Enter Upload Privilege Level..." min="0" step="1" value="0">
                </label><br>
            </div>

            <div class="control-panel">
                <button class="upload-file-button">
                    Upload
                </button>
            </div>

        `;

        const uploadFileContainer = this.querySelector(".upload-file-container");
        const fileSelector = this.uploadType == filesystemEntryType.FILE ? document.createElement("file-selector"): document.createElement("input");
        const uploadFilePrivilegeInput = this.querySelector(".upload-privilege-component");
        const downloadFilePrivilegeInput = this.querySelector(".download-privilege-component");

        if(this.uploadType == filesystemEntryType.FILE)
        {
            fileSelector.initialize(selectionModes.FILE, "File Name...", "");
            
            uploadFilePrivilegeInput.style.display = "none";
        }
        else // It will be a directory.
        {
            
            fileSelector.type = "text";
            fileSelector.placeholder = "Enter the folder name...";
            fileSelector.style.width = "auto";
            downloadFilePrivilegeInput.style.display = "none";
        }


        uploadFileContainer.appendChild(fileSelector);

        initializeStyles();
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

            const message = 
            {
                session: Client.session,
                relativePath: relativePath,
                fileSystemEntryType: this.uploadType, 
                content: fileContent,
                privilege: new Privilege(readPrivilege, downloadPrivilege, uploadPrivilege).toJson()
            }
            
            
            const messageString = JSON.stringify(message);
            const messageBuffer = Buffer.from(messageString, "utf-8");

            const encryptedDataObject = Encryption.aes(messageBuffer, Buffer.from(Client.session.aesKey, "base64"), Buffer.from(Client.session.aesInitialVector, "base64"));
            const encryptedDataBase64 = encryptedDataObject.data.toString("base64");

            //TODO: Encrypt the response 
            const uploadFileResponse = await fetch
            (
                `http://${Client.serverIpWithPort}/uploadFile`,
                {
                    method:'POST',
                    headers:{'Content-Type': 'text/plain'},
                    body: encryptedDataBase64
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