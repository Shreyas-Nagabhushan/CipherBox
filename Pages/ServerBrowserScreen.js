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

        const serverContainer = this.querySelector(".server-container");

        this.style.width = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        const findServersButton = this.querySelector(".find-servers-button");
        findServersButton.style.fontSize = theme.mediumLargeFontSize;
        findServersButton.style.margin = "10px";
        findServersButton.style.padding = "5px";

        const onServersFindCallback = (serverList)=>
        {
            serverContainer.innerHTML = ``;

            for(const server of serverList)
            {
                const serverBrowserChild = document.createElement("server-browser-child");
        
                serverBrowserChild.setAttribute("name", server.name);
                serverBrowserChild.setAttribute("address", server.address + ":" + server.port);
                serverContainer.appendChild(serverBrowserChild);
            }
        }

        this.serverBrowser = new ServerBrowser(onServersFindCallback);
        
        findServersButton.addEventListener("click", (event)=>
        {
            this.serverBrowser.findServers(3001, 3010);
        });
    }
}

customElements.define("server-browser-screen", ServerBrowserScreen);
export default ServerBrowserScreen;