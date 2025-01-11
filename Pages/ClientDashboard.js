import Client from "../Client/Client.js";
import FileExplorer from "../Components/FileExplorer.js";
class ClientDashboard extends HTMLElement
{
    constructor()
    {
        super();
    }
    initialize()
    {
        this.tree = Client.fileSystemTree;  
    }

    connectedCallback()
    {
        this.innerHTML = `
        `;

        const fileExplorer = document.createElement("file-explorer");
        fileExplorer.initialize(this.tree);
        this.appendChild(fileExplorer);

        window.addEventListener("on-directory-change", () => 
        {
            fileExplorer.refresh();
        });
    }
}

customElements.define("client-dashboard", ClientDashboard);
export default ClientDashboard;