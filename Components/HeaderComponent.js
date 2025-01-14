import { theme } from '../Common/Constants/Theme.js';

const express = require('express');

class HeaderComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    showBackButton()
    {
        this.backButton.style.display = "inline-block";
    }

    hideBackButton()
    {
        this.backButton.style.display = "none";
    }
    connectedCallback()
    {
        this.style.display = "flex";
        this.style.width = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        this.style.height = "15%";

        this.innerHTML = `
            <img style="margin:5px;" height="50%" width="auto" src="./assets/Icons/Logo.jpg">
            <h1 style="margin:5px;">Cipher Box</h1>
        `;
        
        this.backButton = document.createElement("button");

        this.backButton.className = "backButton";
        this.backButton.innerText = "Back";
        this.backButton.style.backgroundColor = theme.secondaryBackgroundColor;
        
        this.backButton.style.left = this.backButton.style.top = "5%";
        this.backButton.style.width = "100px"
        this.backButton.style.height = "30px"
        this.backButton.style.position = "fixed";

        this.backButton.onclick = ()=>{ window.goBack(); };
        document.body.appendChild(this.backButton);
    }
}

customElements.define("header-component", HeaderComponent);
export default HeaderComponent;