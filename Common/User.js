import { fileExtensions } from "./Constants/FileExtensions.js";
import Privilege from "./Files/Privilege.js";
import { paths, serverInstance } from "./Globals.js";

const fs = require("fs");
const path = require("path");

class User 
{
    
    constructor(username, password, readPrivilege, downloadPrivilege, uploadPrivilege)
    {
        this.username = username;
        this.password = password;
        this.privilege = new Privilege(readPrivilege, downloadPrivilege, uploadPrivilege);
    }

    toJson()
    {
        //TODO: Hash, salt and encrypt before storing

        return {
            username: this.username,
            password: this.password,
            privilege: this.privilege.toJson()
        };
    }

    static fromJson(json)
    {
        //TODO: Decrypt
        const privilege = json.privilege ? Privilege.fromJson(json.privilege) : null;
        return new User(json["username"], json["password"], privilege.readPrivilege, privilege.downloadPrivilege, privilege.uploadPrivilege);
    }

    save(bNewUser = true)
    {
        const usersDirectory = paths["usersDirectory"];
        const userJson = this.toJson();

        if(bNewUser)
        {
            const userAlreadyExists = fs.existsSync(path.join(usersDirectory, this.username + fileExtensions.USER_FILE));

            if(userAlreadyExists)
            {
                return false;
            }
            
            const userFilePath = path.join(usersDirectory, this.username + fileExtensions.USER_FILE);
            fs.writeFileSync(userFilePath, JSON.stringify(userJson));

            serverInstance.usersList[this.username] = this;
            const usersListUpdatedEvent = new CustomEvent("users-list-updated");
            window.dispatchEvent(usersListUpdatedEvent);

            return true; 
        }
        else 
        {
            const userFilePath = path.join(usersDirectory, this.username + fileExtensions.USER_FILE);
            fs.writeFileSync(userFilePath, JSON.stringify(userJson));
            serverInstance.usersList[this.username] = this;

            const usersListUpdatedEvent = new CustomEvent("users-list-updated");
            window.dispatchEvent(usersListUpdatedEvent);

            return true;
        }
    }
}

export default User;