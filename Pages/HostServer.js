import { selectionModes } from "../Common/Constants/SelectionModes.js";
import { setServerInstance } from "../Common/Globals.js";
import { createServerFile } from "../Common/Utility/CreateServerFile.js";
import FileSelector from "../Components/FileSelector.js";
import Logging from "../Server/Logging/Logging.js";
import Server from "../Server/Server.js";
import AdminDashboard from "./AdminDashboard.js";


class HostServer extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div style="display:flex;flex:1;align-items:center;justify-content:center;">
                <div style=" height: 50%; width: 50%;" class="host-server-popup">

                </div>
            </div>
        `;

        const hostServerPopup = this.querySelector(".host-server-popup");

        const serverPathFileSelector = document.createElement("file-selector");
        serverPathFileSelector.initialize(selectionModes.FOLDER, "Server File Path...", "");
        hostServerPopup.appendChild(serverPathFileSelector);

        const serverNameTextBox = document.createElement("input");
        serverNameTextBox.type = "text";
        serverNameTextBox.placeholder = "Server Name...";
        serverNameTextBox.style.display = "block";
        serverNameTextBox.style.margin = "5px 0px";
        hostServerPopup.appendChild(serverNameTextBox);

        const rootDirectoryUploadPrivilege = document.createElement("input");
        rootDirectoryUploadPrivilege.placeholder = "Root Privilage Level ";
        rootDirectoryUploadPrivilege.type = "number";
        rootDirectoryUploadPrivilege.min = 0;
        rootDirectoryUploadPrivilege.step = 1;
        hostServerPopup.appendChild(rootDirectoryUploadPrivilege);

        const createServerButton = document.createElement("button");
        createServerButton.innerText = "Create Server";

        createServerButton.addEventListener("click", (event) => 
        {   
            const bSuccess = createServerFile(serverPathFileSelector.value, serverNameTextBox.value, parseInt(rootDirectoryUploadPrivilege.value));

            if(bSuccess)
            {
                const serverInstance = new Server(serverNameTextBox.value);
                setServerInstance(serverInstance);
                
                window.openPage("admin-dashboard");
                Logging.log("Welcome Admin");
            }   
            else
            {
                //TODO:
                
            }
            
            
        });

        hostServerPopup.appendChild(createServerButton);        
    }
}

customElements.define("host-server", HostServer);
export default HostServer;

