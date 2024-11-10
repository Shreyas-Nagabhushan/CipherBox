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
                background-color: blue;
                width:75%;
                height:75%;
            }
        </style>
        <div class = "server-container">

        </div>
        `;
        this.style.backgroundColor = "red";
        this.style.width = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
    }
}

customElements.define("server-browser-screen", ServerBrowserScreen);
export default ServerBrowserScreen;