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
        `;
        this.style.width = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        const serverBrowserChild = document.createElement("server-browser-child");
        const serverContainer = document.querySelector(".server-container");
        serverBrowserChild.setAttribute("name", "Server 1");
        serverBrowserChild.setAttribute("address", "127.0.0.1:7777");
        serverContainer.appendChild(serverBrowserChild);
    }
}

customElements.define("server-browser-screen", ServerBrowserScreen);
export default ServerBrowserScreen;