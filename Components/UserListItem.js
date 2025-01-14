import { fileExtensions } from "../Common/Constants/FileExtensions.js";
import { theme } from "../Common/Constants/Theme.js";
import { serverInstance, paths } from "../Common/Globals.js";
import UserEditorPage from "../Pages/UserEditorPage.js";
const sha256 = require('crypto-js/sha256');
const path = require("path");
const fs = require("fs");

class UserListItem extends HTMLElement
{
    constructor()
    {
        super();
    }
    initialize(userObject)
    {
        this.userObject = userObject;
    }
    //username, password, readPrivilege, writePrivilage,  downloadPrivilege
    connectedCallback()
    {
        this.style.border = "solid white 2px";
        this.style.padding = "5px";
        this.style.borderRadius = "5px";
        this.style.width = "100%";
        this.style.display = "flex";
        this.style.boxSizing = "border-box";
        this.style.fontSize = theme.mediumLargeFontSize;


        this.innerHTML = `
            <div class="user-container" style="flex:3;">${this.userObject["username"]}</div>
            <div class="user-container" style="flex:3;">'Read': ${this.userObject.privilege["readPrivilege"]}</div>
            <div class="user-container" style="flex:3;">'Dwnld': ${this.userObject.privilege["downloadPrivilege"]}</div>
            <div class="user-container" style="flex:3;">'Upload': ${this.userObject.privilege["uploadPrivilege"]}</div>

            <button class="edit-user-button" style="flex:1;">Edit</button>
            <button class="delete-user-button" style="flex:1;">Delete</button>                 
        `;


        const editUserButton = this.querySelector(".edit-user-button");
        const deleteUserButton = this.querySelector(".delete-user-button");

        editUserButton.addEventListener("click", () =>
        {
           window.openPage("user-editor-page",this.userObject);
        });

        deleteUserButton.addEventListener("click", () =>
        {
            // Move to different file
            const usersDirectory = paths["usersDirectory"];
            const userFilePath = path.join(usersDirectory, this.userObject["username"] + fileExtensions.USER_FILE);
            delete serverInstance.usersList[this.userObject["username"]];
            
            fs.unlinkSync(userFilePath);
            
            const usersListUpdatedEvent = new CustomEvent("users-list-updated");
            window.dispatchEvent(usersListUpdatedEvent);
        });
    }
}

customElements.define("user-list-item", UserListItem);
export default UserListItem;