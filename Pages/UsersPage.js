import { theme } from "../Common/Constants/Theme.js";
import { getServerInstance } from "../Common/Globals.js";
import { initializeStyles } from "../Common/InitializeStyles.js";
import UserListItem from "../Components/UserListItem.js";
import UserEditorPage from "./UserEditorPage.js";

class UsersPage extends HTMLElement
{
    constructor()
    {
        super();
    }
    
    initialize()
    {
        const server = getServerInstance();
        this.usersList = server.usersList;
    }

    refresh()
    {
        const userContainer = this.querySelector(".users-list-container");
        userContainer.innerHTML = "";

        for(const userObject of Object.values(this.usersList))
        {
            const userListItem = document.createElement("user-list-item");
            userListItem.initialize(userObject);
            userContainer.appendChild(userListItem);
        }

        initializeStyles();
    }

    connectedCallback()
    {
        
        this.innerHTML = `
        <style>
            .users-list-container
            {
                width:85%;
                flex:3;
                border: solid white 2px;
                padding: 5px;
                overflow-y: scroll;
            }
            
        </style>
        <div style="flex:1; align-items: center;justify-content: center;">
            <h1 align="center">Users</h1>
        </div>
        <div class = "users-list-container">
        
            
        </div>
        <button class="add-users-button">Add Users</button>        
        `;

        this.style.display = "flex";
        this.style.width = "100%";
        this.style.height = "85%";
        this.style.flex = 1;
        this.style.flexDirection = "column";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";


        const addUsersButton = this.querySelector(".add-users-button");

        addUsersButton.style.fontSize = theme.mediumLargeFontSize;
        addUsersButton.style.margin = "10px";
        addUsersButton.style.padding = "5px";

        addUsersButton.addEventListener("click", () =>
        {
            window.openPage("user-editor-page");
        });      
        
        window.addEventListener("users-list-updated", ()=>
        {
            this.refresh();
        });

        this.refresh();

    }
}

customElements.define("users-page",UsersPage);
export default UsersPage;