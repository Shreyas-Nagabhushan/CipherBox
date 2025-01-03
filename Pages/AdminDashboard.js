import { paths, serverInstance, setServerInstance } from "../Common/Globals.js";
import Server from "../Server/Server.js";

const path = require('path');

class AdminDashboard extends HTMLElement
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
                    // background-color: aqua;
                    border: 3px solid white;
                    border-radius: 5px;

                    width: 75%;
                    height: 80%;
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
                    // background-color: green;
                    flex: 2.5;
                    
                }
                .log-title
                {   
                    // background-color: blue;
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
            <button class = "start-stop-button">Start</button>
        `;

        const startStopButton = this.querySelector(".start-stop-button");

        const toggleStartStopServer = () =>
        {
            startStopButton.innerText = startStopButton.innerText == "Start"  ? "Stop": "Start"; 
        }

        startStopButton.addEventListener("click", (event)=>
        {
            
            
            if(startStopButton.innerText == "Start")
            {   
                const serverDirectory = path.dirname(paths["openedFrom"]);;
                
                paths["logsDirectory"] = path.join(serverDirectory, "Logs");
                paths["filesDirectory"] = path.join(serverDirectory, "Files");

                const serverName = path.basename(paths["openedFrom"]);
                const logsDirectory = paths["logsDirectory"];
                setServerInstance(new Server(serverName, logsDirectory, 3000));
            }
            else
            {
                serverInstance.stopFileServer();
            }

            toggleStartStopServer();

        });

        // const serverButtonText = Server.isRunning() ? "Stop" : "Start ";
        
        
    }

    
}

customElements.define("admin-dashboard", AdminDashboard);
export default AdminDashboard;