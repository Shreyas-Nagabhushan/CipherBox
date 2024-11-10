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
            <img style="margin:5px;" height="50%" width="auto" src="https://img.freepik.com/premium-vector/decorative-square-frame-border-with-geometric-lines-symmetrical-pattern-outlined-shape_1226483-15150.jpg">
            <h1 style="margin:5px;">Cipher Box</h1>
        `;
        
        this.backButton = document.createElement("button");

        this.backButton.id = "backButton";
        this.backButton.innerText = "Back";
        this.backButton.style.backgroundColor = theme.secondaryBackgroundColor;
        
        this.backButton.style.left = this.backButton.style.top = "5%";
        this.backButton.style.width = "100px"
        this.backButton.style.height = "30px"
        this.backButton.style.position = "fixed";

        const style = document.createElement('style');
        style.textContent =
            `            
            #backButton:hover{
                // color: rgb(0, 136, 255);
                cursor: pointer;
                border: 2px solid rgb(0, 136, 255);           
            }

            #backButton{
                color: white;
                border: solid white 2px;
            }    
            `;

        this.backButton.onclick = ()=>{ window.goBack(); };
        document.body.appendChild(this.backButton);
        document.body.appendChild(style);
    }
}

customElements.define("header-component", HeaderComponent);
export default HeaderComponent;