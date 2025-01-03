import ServerBrowser from "../Client/ServerBrowser.js";
import { openFolderSelectionDialog } from "../Common/Utility/OpenFolderSelectionDialog.js";
import Server from "../Server/Server.js";
import HostServer from "./HostServer.js";
import ServerBrowserScreen from "./ServerBrowserScreen.js";
import LoginPgComponent from "../Components/LoginPgComponent.js";

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
                
                .host-server-button:hover, .login-as-client-button:hover{
                    border: 2px solid rgb(0, 136, 255);
                    cursor: pointer;
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
            window.openPage("host-server");

        }); 

        //TODO: THIS IS TESTING CODE
        const loginAsClientButton = document.querySelector(".login-as-client-button");

        loginAsClientButton.addEventListener("click", (event) => 
        {
            // const browser = new ServerBrowser();
            // console.log("Server browser created!");
            // window.openPage("server-browser-screen");

            console.log('Login Pg!');
            window.openPage("loginpg-component");
        }); 
    }
}

customElements.define("home-screen", HomeScreen);
export default HomeScreen;

