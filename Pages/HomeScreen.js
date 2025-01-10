import ServerBrowser from "../Client/ServerBrowser.js";
import { openFolderSelectionDialog } from "../Common/Utility/OpenFolderSelectionDialog.js";
import Server from "../Server/Server.js";
import HostServer from "./HostServer.js";
import ServerBrowserScreen from "./ServerBrowserScreen.js";
import OpenServer from "./OpenServer.js";

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
                
                home-screen button :hover
                {
                    border: 2px solid rgb(0, 136, 255);
                    cursor: pointer;
                }

                home-screen button
                {
                    border: solid white 2px;
                    border-radius: 15px;
                    color: white;
                    box-sizing: border-box;
                    min-height: 75px;
                    width: 25%;
                }        
            </style>
            <button class="create-server-button">
                Create New Server
            </button>
            
            <button class="open-existing-server-button">
                Open Existing Server
            </button>

            <button class="login-as-client-button">
                Login as Client
            </button>
        `;
        
        const hostServerButton = document.querySelector(".create-server-button");
        const loginAsClientButton = document.querySelector(".login-as-client-button");
        const openExistingServerButton = document.querySelector(".open-existing-server-button");

        hostServerButton.addEventListener("click", async (event) => 
        {
            window.openPage("host-server");
        }); 

        loginAsClientButton.addEventListener("click", (event) => 
        {
            window.openPage("server-browser-screen");
        }); 

        openExistingServerButton.addEventListener("click", async (event) =>
        {
            window.openPage("open-server");
        });
    }
}

customElements.define("home-screen", HomeScreen);
export default HomeScreen;

