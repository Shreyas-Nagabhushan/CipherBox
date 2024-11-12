import { theme } from '../Common/Constants/Theme.js';
class AdminComponent extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {   
        this.style.display = "flex";
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        
        this.innerHTML = `
            <style>
                
            </style>
            <div class="admin-dashboard">
                <div class="button-options">
                    <button class="admin-buttons">Create/Modify User</button>
                    <button class="admin-buttons">Kill Server</button>
                    <button class="admin-buttons">....</button>
                </div>
                <div class="log-section">
                    <div class="log-title">

                    </div>

                </div>
                
            </div>
        `;
    }
}

customElements.define("admin-component", AdminComponent);
export default AdminComponent;