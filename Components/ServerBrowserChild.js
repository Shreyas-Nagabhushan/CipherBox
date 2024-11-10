class ServerBrowserChild extends HTMLElement
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

customElements.define("server-browser-child", ServerBrowserChild);
export default ServerBrowserChild;