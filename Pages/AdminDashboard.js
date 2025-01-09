import { getServerInstance, paths, serverInstance, setServerInstance } from "../Common/Globals.js";
import Logging from "../Server/Logging/Logging.js";
import Server from "../Server/Server.js";
import UsersPage from "./UsersPage.js";

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
                    <button class="admin-buttons create-modify-button">Create/Modify User</button>
                    <button class="admin-buttons kill-server-button">Kill Server</button>
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
                setServerInstance(new Server(path.basename(paths["serverFile"], ".cboxsv"), paths["logsDirectory"], 3000));
            }
            else
            {
                serverInstance.stopFileServer();
            }

            toggleStartStopServer();

        });
        const dummyUserList =[
            {
                username:"Sooraj", password:"1234", readPrivilege:1, writePrivilege:1,  downloadPrivilege:1 
            },
            {
                username:"Suvan", password:"456", readPrivilege:2, writePrivilege:2,  downloadPrivilege:2 
            }
        ]

        const createModifyUserButton = this.querySelector(".create-modify-button");
        createModifyUserButton.addEventListener("click", () =>
        {
            window.openPage("users-page",dummyUserList);
        })


        // const serverButtonText = Server.isRunning() ? "Stop" : "Start ";
        
        
    }

    
}

customElements.define("admin-dashboard", AdminDashboard);
export default AdminDashboard;