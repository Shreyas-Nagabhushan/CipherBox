import ServerBrowser from "../Client/ServerBrowser.js";
import { openFolderSelectionDialog } from "../Common/Utility/OpenFolderSelectionDialog.js";
import Server from "../Server/Server.js";

class HomeScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div class ="buttons-container">
                <button class="host-server-button">
                    Host Server
                </button>
                
                <button class="login-as-client-button">
                    Login as Client
                </button>
            </div>
        `;
        
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

    }
}

customElements.define("home-screen", HomeScreen);
export default HomeScreen;

