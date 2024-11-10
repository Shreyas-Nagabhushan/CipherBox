import { selectionModes } from "../Common/Constants/SelectionModes.js";
import { createServerFile } from "../Common/Utility/CreateServerFile.js";
import FileSelector from "../Components/FileSelector.js";
import Server from "../Server/Server.js";


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
        hostServerPopup.appendChild(serverNameTextBox);

        const createServerButton = document.createElement("button");
        createServerButton.innerText = "Create Server";
        createServerButton.addEventListener("click", (event) => 
        {   
            const bSuccess = createServerFile(serverPathFileSelector.value, serverNameTextBox.value);

            if(bSuccess)
            {
                const serverInstance = new Server();
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

