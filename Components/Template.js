class Template extends HTMLElement
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

customElements.define("template", Template);
export default Template;