import { openFolderSelectionDialog } from "../Common/Utility/OpenFolderSelectionDialog.js";
import Server from "../Server/Server.js";

const hostServerButton = document.querySelector(".host-server-button");

hostServerButton.addEventListener("click", async (event) => 
{
    const navigatorAnchor = document.createElement("a");
    navigatorAnchor.href = "./HostServer.html";
    navigatorAnchor.click();
    
}); 