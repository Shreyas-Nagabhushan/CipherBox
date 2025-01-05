import { theme } from '../Common/Constants/Theme.js';
import ServerBrowser from "../Client/ServerBrowser.js";
import Server from "../Server/Server.js";
// import HostServer from "./HostServer.js";
// import ServerBrowserScreen from "./ServerBrowserScreen.js";


class LoginPageComponent extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        this.style.display = "flex";
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        this.innerHTML = `
            <style>
                .login-pg
                {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    height:100%;
                    border: 2px solid white;
                    width: 50%;
                    height: 50%;
                    border-radius: 15px;
                }
                
                .login-button
                {
                    font-size: 20px;
                    cursor: pointer;
                }
            </style>
            <div class = "login-pg">
                <input type="text" placeholder="Enter User-ID"></input>
                <input type="password" placeholder="Enter Password"></input>
                <button class="login-button">Login</button>
            </div>
        `;

        //Temporary trying out to link the server-browser with the LOGIN button.
        const loginButtonAction = document.querySelector(".login-button");
        loginButtonAction.addEventListener("click", async (event) => 
        {
            const browser = new ServerBrowser();
            console.log("Server browser created!");
            window.openPage("server-browser-screen");
        });
    }
}

customElements.define("login-page-component", LoginPageComponent);
export default LoginPageComponent;