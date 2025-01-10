import { logMessageColorMap } from "../Common/Constants/LogMessageType.js";

class LogMessageComponent extends HTMLElement
{
    constructor()
    {
        super();
    }
    
    initialize(message, type, timeStamp)
    {
        this.timeStamp = timeStamp;
        this.message = message;
        this.type = type;
    }

    connectedCallback()
    {
        this.innerHTML = `<p style="margin: 0;">[${this.timeStamp}]: ${this.message}</p>`
        
        this.style.color = logMessageColorMap[this.type];
    }
}

customElements.define("log-message-component", LogMessageComponent);
export default LogMessageComponent;