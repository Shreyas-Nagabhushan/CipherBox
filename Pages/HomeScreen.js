import { openFolderSelectionDialog } from "../Common/Utility/OpenFolderSelectionDialog.js";
import Server from "../Server/Server.js";

const hostServerButton = document.querySelector(".host-server-button");

hostServerButton.addEventListener("click", async (event) => 
{
    const path = await openFolderSelectionDialog();

    console.log(path);
    
    const serverInstance = new Server();
    
});