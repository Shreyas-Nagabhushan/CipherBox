class ServerBrowser extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            
        `;
    }
}

customElements.define("server-browser", ServerBrowser);
export default ServerBrowser;