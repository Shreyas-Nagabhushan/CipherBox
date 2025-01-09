import { theme } from "../Common/Constants/Theme.js";

class UserEditorPage extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(userObject = null)
    {
        this.userObject = userObject;
    }

    applyStyles()
    {

        const userEditorContainer = this.querySelector(".user-editor-container");
        const controlPanel = this.querySelector(".control-panel");
        const saveUserButton = this.querySelector(".save-user-button");

        this.style.display = "flex"; 
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.flexDirection = "column";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        this.style.backgroundColor = theme.primaryBackgroundColor;
        this.style.color = theme.foregroundColor;

        userEditorContainer.style.flex = 0.8;
        userEditorContainer.style.display = "flex";
        userEditorContainer.style.flexDirection = "column";
        userEditorContainer.style.justifyContent = "center";
        userEditorContainer.style.alignItems = "center";
        userEditorContainer.style.width = "75%";

        userEditorContainer.querySelectorAll("input").forEach((input)=>
        {
            input.style.display = "block";
            input.style.width = "100%";
            input.style.padding = "10px";
            input.style.margin = "10px";
            input.style.border = "solid white 2px";
            input.style.borderRadius = "5px";
            input.style.backgroundColor = theme.secondaryBackgroundColor;
            input.style.color = "white";
            input.style.fontSize = "20px";
        });

        controlPanel.style.flex = 0.2;
        controlPanel.style.display = "flex";
        controlPanel.style.flexDirection = "column";
        controlPanel.style.justifyContent = "center";
        controlPanel.style.alignItems = "center";
        controlPanel.style.width = "100%";

        saveUserButton.style.width = "25%";
        saveUserButton.style.padding = "10px";
        saveUserButton.style.margin = "10px";
        saveUserButton.style.border = "solid white 2px";
        saveUserButton.style.borderRadius = "5px";
        saveUserButton.style.backgroundColor = theme.secondaryBackgroundColor;
        saveUserButton.style.color = theme.foregroundColor;
        saveUserButton.style.fontSize = "20px";

    }

    connectedCallback()
    {
        this.innerHTML = `

            <div class="user-editor-container">
                <h1 align="center">User Editor</h1>
                <input type="text" class="username-text-box" placeholder="Enter Username...">
                <input type="password" class="password-text-box" placeholder="Enter Password...">
                <input type="number" class="read-privilege-level-text-box" placeholder="Enter Read Privilege Level..." min="0" step="1">
                <input type="number" class="write-privilege-level-text-box" placeholder="Enter Write Privilege Level..." min="0" step="1">
                <input type="number" class="download-privilege-level-text-box" placeholder="Enter Download Privilege Level..." min="0" step="1">
            </div>

            <div class="control-panel">
                <button class="save-user-button">
                    Save
                </button>
            </div>
        `;

        this.applyStyles();

        const usernameInput = this.querySelector(".username-text-box");
        const passwordInput = this.querySelector(".password-text-box")
        const readPrivilegeLevelInput = this.querySelector(".read-privilege-level-text-box");
        const writePrivilegeLevelInput = this.querySelector(".write-privilege-level-text-box");
        const downloadPrivilegeLevelInput = this.querySelector(".download-privilege-level-text-box");
        const saveUserButton = this.querySelector(".save-user-button");
        
        if(this.userObject != null)
        {
            usernameInput.value = this.userObject["username"];
            passwordInput.value = this.userObject["password"];
            readPrivilegeLevelInput.value = this.userObject["readPrivilege"];
            writePrivilegeLevelInput.value = this.userObject["writePrivilege"];
            downloadPrivilegeLevelInput.value = this.userObject["downloadPrivilege"];
        }



        saveUserButton.addEventListener("click", async (event)=>
        {
            const username = usernameInput.value;
            const password = passwordInput.value;
            const readPrivilegeLevel = parseInt(readPrivilegeLevelInput.value);
            const writePrivilegeLevel = parseInt(writePrivilegeLevelInput.value);
            const downloadPrivilegeLevel = parseInt(downloadPrivilegeLevelInput.value);
            

        });
    }
}

customElements.define("user-editor-page", UserEditorPage);
export default UserEditorPage;