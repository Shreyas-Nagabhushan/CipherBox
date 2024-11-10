import ServerBrowser from "../Client/ServerBrowser.js";
import { openFolderSelectionDialog } from "../Common/Utility/OpenFolderSelectionDialog.js";
import Server from "../Server/Server.js";

const hostServerButton = document.querySelector(".host-server-button");

hostServerButton.addEventListener("click", async (event) => 
{
    const navigatorAnchor = document.createElement("a");
    navigatorAnchor.href = "./HostServer.html";
    navigatorAnchor.click();
    
}); 

//TODO: THIS IS TESTING CODE
const loginAsClintButton = document.querySelector(".login-as-client-button");

loginAsClintButton.addEventListener("click", async (event) => 
{
    const browser = new ServerBrowser();
    console.log("Server browser created!");
}); 