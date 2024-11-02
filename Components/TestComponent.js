class TestComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            <h1>NEW COMPONENT<h1>
            <br>
            <h2>H2 HERE <h2>
        `;
    }
}

customElements.define("test-component", TestComponent);
export default TestComponent;