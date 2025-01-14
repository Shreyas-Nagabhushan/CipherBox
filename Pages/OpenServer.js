import { fileExtensions } from "../Common/Constants/FileExtensions.js";
import { selectionModes } from "../Common/Constants/SelectionModes.js";
import { setServerInstance } from "../Common/Globals.js";
import { setupGlobalPathsForServerFile } from "../Common/Utility/SetupGlobalPathsForServerFile.js";
import AlertComponent from "../Components/AlertComponent.js";
import FileSelector from "../Components/FileSelector.js";
import Server from "../Server/Server.js";
import AdminDashboard from "./AdminDashboard.js";

const path = require("path");

class OpenServer extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        this.innerHTML = `
            
        `;

        this.style.display = "flex";
        this.style.width = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        const fileSelector = document.createElement("file-selector");
        const openButton = document.createElement("button");

        openButton.innerText = "Open Server";
        openButton.style.margin = "10px";
        openButton.style.padding = "10px";

        if(fileSelector instanceof FileSelector)
        {
            fileSelector.initialize(selectionModes.FILE, "Select Server File", "", (extension) => { return extension == fileExtensions.SERVER_FILE; });
        }

        this.appendChild(fileSelector);
        this.appendChild(openButton);

        openButton.addEventListener("click", (event) =>
        {
            const serverFilePath = fileSelector.value;
            console.log("Trying to open server: " + serverFilePath);

            if(serverFilePath)
            {
                const serverFolderPath = path.dirname(serverFilePath);
                const serverName = path.basename(serverFilePath, fileExtensions.SERVER_FILE);
                setupGlobalPathsForServerFile(serverFolderPath, serverName);

                const serverInstance = new Server(serverName);
                setServerInstance(serverInstance);

                window.openPage("admin-dashboard");
            }
            else
            {
                AlertComponent.alert("Choose a server..!");
            }

            
        });
    }
}

customElements.define('open-server', OpenServer);
export default OpenServer;