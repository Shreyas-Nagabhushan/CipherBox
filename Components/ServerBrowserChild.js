import { theme } from "../Common/Constants/Theme.js";
import Logging from "../Server/Logging/Logging.js";

class ServerBrowserChild extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.border = "solid white 2px";
        this.style.padding = "5px";
        this.style.borderRadius = "5px";
        this.style.width = "100%";
        this.style.display = "flex";
        this.style.boxSizing = "border-box";
        this.style.fontSize = theme.mediumLargeFontSize;
        
        
        this.innerHTML = `
            <div class="server-name-container" style="flex:3;">${this.getAttribute("name")}</div>
            <div class="server-address-container" style="flex:2;">${this.getAttribute("address")}</div>
            <button class="connect-server-button" style="flex:1;">Connect</button>    
        `;

        const connectServerButton = this.querySelector(".connect-server-button");

        connectServerButton.addEventListener("click", async (event) => 
        {
            const ipWithPort = this.getAttribute("address");

            const response = await fetch
            (
                `http://${ipWithPort}`,
                {
                    method: 'GET'
                }
            );

            const responseJson = await response.json();
            console.log(responseJson);

        });


    }
}

customElements.define("server-browser-child", ServerBrowserChild);
export default ServerBrowserChild;