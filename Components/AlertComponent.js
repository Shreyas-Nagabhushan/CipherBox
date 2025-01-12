import { theme } from "../Common/Constants/Theme.js";

class AlertComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    static alert(message, callback=()=>{})
    {
        const alertComponent = document.createElement("alert-component");
        alertComponent.setAttribute("message", message);
        alertComponent.setCallback(callback);
        document.body.appendChild(alertComponent);
    }
    
    setCallback(callback)
    {
        this.callback = callback;
    }
    connectedCallback()
    {
        
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.position = "fixed";

        this.innerHTML = `
            <div class="container">
                <div class="alert-message">${this.getAttribute("message")}</div>
                <button class="alert-button">OK</button>
            </div>        
        `;
        const container = this.querySelector(".container");

        container.style.display = "flex";
        container.style.position = "absolute";
        container.style.zIndex = 100;
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.justifyContent = "space-evenly";
        container.style.backgroundColor = theme.secondaryBackgroundColor;
        container.style.border = "solid white 2px";
        container.style.borderRadius = "5px";
        container.style.color = "white";
        container.style.width = "25%";
        container.style.height = "25%";

        this.addEventListener("click", (event)=>
        {
            event.stopPropagation();
        });

        this.querySelector(".alert-button").addEventListener("click", (event)=>
        {
            if(this.callback)
            {
                this.callback();
            }
            
            this.remove();
        });

        
    }
}

customElements.define("alert-component", AlertComponent);
export default AlertComponent;