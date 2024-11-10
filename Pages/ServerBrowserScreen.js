import ServerBrowser from "../Client/ServerBrowser.js";
import { theme } from "../Common/Constants/Theme.js";
import ServerBrowserChild from "../Components/ServerBrowserChild.js";

class ServerBrowserScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
        <style>
            .server-container
            {
                width:75%;
                height:75%;
                border: solid white 2px;
                padding: 5px;
            }
        </style>
        <div class = "server-container">
            
        </div>
        <button class="find-servers-button">Find Servers</button>
        `;
        this.style.width = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        this.serverBrowser = new ServerBrowser();
        const serverBrowserChild = document.createElement("server-browser-child");
        const serverContainer = this.querySelector(".server-container");
        serverBrowserChild.setAttribute("name", "Server 1");
        serverBrowserChild.setAttribute("address", "127.0.0.1:7777");
        serverContainer.appendChild(serverBrowserChild);



        const findServersButton = this.querySelector(".find-servers-button");
        findServersButton.style.fontSize = theme.mediumLargeFontSize;
        findServersButton.style.margin = "10px";
        findServersButton.style.padding = "5px";
    }
}

customElements.define("server-browser-screen", ServerBrowserScreen);
export default ServerBrowserScreen;