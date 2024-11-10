import { selectionModes } from "../Common/Constants/SelectionModes.js";
import { createServerFile } from "../Common/Utility/CreateServerFile.js";
import Server from "../Server/Server.js";

const hostServerPopup = document.querySelector(".host-server-popup");

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


