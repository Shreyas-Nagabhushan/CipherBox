class ClientDashboard extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            Hello
        `;
    }
}

customElements.define("client-dashboard", ClientDashboard);
export default ClientDashboard;