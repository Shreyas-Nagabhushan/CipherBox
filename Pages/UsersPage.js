import { theme } from "../Common/Constants/Theme.js";
import UserListItem from "../Components/UserListItem.js";

class UsersPage extends HTMLElement
{
    constructor()
    {
        super();
    }
    initialize(userList)
    {
        this.userList = userList;
    }
    connectedCallback()
    {
        console.log("User-Pge is opened!");
        this.innerHTML = `
        <style>
            .user-container
            {
                width:75%;
                height:75%;
                border: solid white 2px;
                padding: 5px;
            }
            
        </style>
        <div class = "user-container">
            
        </div>
        <button class="add-users-button">Add Users</button>        
        `;

        this.style.width = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        const userContainer = this.querySelector(".user-container");
        const addUsersButton = this.querySelector(".add-users-button");

        addUsersButton.style.fontSize = theme.mediumLargeFontSize;
        addUsersButton.style.margin = "10px";
        addUsersButton.style.padding = "5px";

        for(const userObject of this.userList)
        {
            const userListItem = document.createElement("user-list-item");
        
            console.log(userObject);
            console.log("\n WHat came before was userspage");
            userListItem.initialize(userObject);
            userContainer.appendChild(userListItem);
        }

        addUsersButton.addEventListener("click", () =>
        {
            //remove alert
            alert("TO add new users");
        });        

    }
}

customElements.define("users-page",UsersPage);
export default UsersPage;