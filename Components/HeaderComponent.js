const express = require('express');

class HeaderComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.width = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        this.style.height = "15%";

        this.innerHTML = `
            <img style="margin:5px;" height="50%" width="auto" src="https://img.freepik.com/premium-vector/decorative-square-frame-border-with-geometric-lines-symmetrical-pattern-outlined-shape_1226483-15150.jpg">
            <h1 style="margin:5px;">Cipher Box</h1>
        `;
    }
}

customElements.define("header-component", HeaderComponent);
export default HeaderComponent;