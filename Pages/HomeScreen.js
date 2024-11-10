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
        this.className = "buttons-container"; 
        
        this.innerHTML = `
            <style>
                .buttons-container
                {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    height:100%;
                }
                .host-server-button, .login-as-client-button
                {
                    border: solid white 2px;
                    border-radius: 15px;
                    color: white;
                    box-sizing: border-box;
                    min-height: 75px;
                    width: 25%;
                }
            </style>
            <button class="host-server-button">
                Host Server
            </button>
            
            <button class="login-as-client-button">
                Login as Client
            </button>
        `;
        
        const hostServerButton = document.querySelector(".host-server-button");

        hostServerButton.addEventListener("click", async (event) => 
        {
            // const navigatorAnchor = document.createElement("a");
            // navigatorAnchor.href = "./HostServer.html";
            // navigatorAnchor.click();

            window.openPage("host-server");
            
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

