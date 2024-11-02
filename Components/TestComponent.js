class TestComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        
    }
}

customElements.define("test-component", TestComponent);
export default TestComponent;