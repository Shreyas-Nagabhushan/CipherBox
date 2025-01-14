import { fileExtensions } from "../Common/Constants/FileExtensions.js";
import { getServerInstance, paths, serverInstance, setServerInstance } from "../Common/Globals.js";
import Logging from "../Server/Logging/Logging.js";
import Server from "../Server/Server.js";
import LogMessageComponent from "../Components/LogMessageComponent.js";
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
        this.style.flexDirection = "column";
        this.style.flex = 1;
        this.style.width = "100%";
        this.style.height = "85%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        
        this.innerHTML = `
            <style>
                .admin-dashboard
                {
                    border: 3px solid white;
                    border-radius: 5px;
                    overflow: hidden;
                    flex:5;
                    width: 75%;
                    display: flex;
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
                    flex: 2.5;
                    overflow: hidden;
                    height: 100%; 
                    max-height: 100%;
                }
                .log-title
                {   
                    border-bottom: 2px solid white;
                    flex: 1;
                    top: 0px;
                    text-align:center;
                    align-items: center;
                }
                .log-content
                {
                    flex: 9;
                    padding: 5px;
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
                </div>
                <div class="log-section">
                    <div class="log-title" style="padding: auto;">
                        Server Logs
                    </div>
                   <div class="log-content">

                   </div>
                </div>
                
            </div>
            <button class = "start-stop-button" style="flex:1;">Start</button>
        `;

        const startStopButton = this.querySelector(".start-stop-button");
        const logContent = this.querySelector(".log-content");

        const toggleStartStopServer = () =>
        {
            startStopButton.innerText = startStopButton.innerText == "Start"  ? "Stop": "Start"; 
        }

        startStopButton.addEventListener("click", (event)=>
        {
            if(startStopButton.innerText == "Start")
            {   
                serverInstance.startFileServer();
            }
            else
            {
                serverInstance.stopFileServer();
            }

            toggleStartStopServer();

        });

        const createModifyUserButton = this.querySelector(".create-modify-button");
        createModifyUserButton.addEventListener("click", () =>
        {
            window.openPage("users-page");
        })

        

        window.addEventListener("console-log", (event)=>
        {
            const logMessageComponent = document.createElement("log-message-component");
            logMessageComponent.initialize(event.detail.message, event.detail.type, event.detail.timeStamp);
            logContent.appendChild(logMessageComponent);
            logContent.scrollTop = logContent.scrollHeight;
        });

        
        
    }

    
}

customElements.define("admin-dashboard", AdminDashboard);
export default AdminDashboard;
