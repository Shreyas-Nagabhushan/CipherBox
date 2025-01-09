import { theme } from "../Common/Constants/Theme.js";
import UserEditorPage from "../Pages/UserEditorPage.js";

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
        console.log("Userlistitem page");
        console.log(this.userObject);

        this.innerHTML = `
            <div class="user-container" style="flex:3;">${this.userObject["username"]}</div>
            <div class="user-container" style="flex:3;">${this.userObject["readPrivilege"]}</div>
            <div class="user-container" style="flex:3;">${this.userObject["writePrivilege"]}</div>
            <div class="user-container" style="flex:3;">${this.userObject["downloadPrivilege"]}</div>

            <button class="edit-user-button" style="flex:1;">Edit</button>                
        `;

        for(const field in this.userObject)
        {
            const userContainerDiv = document.createElement("div");
            userContainerDiv.className = "user-container";
            userContainerDiv.style.flex = 3;
            userContainerDiv.innerText = this.userObject["field"];

        }
        const editUserButton = this.querySelector(".edit-user-button");
        editUserButton.addEventListener("click", () =>
        {
           window.openPage("user-editor-page",this.userObject);
        });
    }
}

customElements.define("user-list-item", UserListItem);
export default UserListItem;