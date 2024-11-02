class TestComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            <h1>${this.getAttribute("name")}<h1>
            <br>
        `;
    }
}

customElements.define("test-component", TestComponent);
export default TestComponent;