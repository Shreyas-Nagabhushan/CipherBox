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
                .admin-dashboard
                {
                    background-color: aqua;
                    border: 3px solid white;
                    border-radius: 5px;

                    width: 75%;
                    height: 75%;
                    display: flex;
                    flex-direction: row;
                }
                .button-options
                {
                    display: flex;
                    flex-direction: column;
                    flex: 1.5;
                    justify-content: space-evenly;
                    align-items: center; 
                    border-right: 2px solid white;                   
                }
                .log-section
                {   
                    display: flex;
                    flex-direction: column;
                    background-color: green;
                    flex: 2.5;
                    
                }
                .log-title
                {   
                    background-color: blue;
                    border-bottom: 2px solid white;
                    flex: 1;
                    top: 0px;
                    text-align:center;
                    align-items: center;
                }
                .content
                {
                    flex: 9;
                    overflow: auto;
                }
                .admin-buttons
                {
                    margin: 10px 80px;
                    width: 50%;
                    border-radius: 7px;
                }
                .admin-buttons:hover
                {
                    border: 2px solid blue;
                    cursor: pointer;
                }
            </style>
            <div class="admin-dashboard">
                <div class="button-options">
                    <button class="admin-buttons">Create/Modify User</button>
                    <button class="admin-buttons">Kill Server</button>
                    <button class="admin-buttons">....</button>
                </div>
                <div class="log-section">
                    <div class="log-title">
                        Server Logs
                    </div>
                    <pre class="content">
                        
                    </pre>

                </div>
                
            </div>
        `;
    }
}

customElements.define("admin-component", AdminComponent);
export default AdminComponent;