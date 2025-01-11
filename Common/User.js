import { fileExtensions } from "./Constants/FileExtensions.js";
import { paths, serverInstance } from "./Globals.js";

const fs = require("fs");
const path = require("path");

class User 
{
    
    constructor(username, password, readPrivilege, downloadPrivilege, uploadPrivilege)
    {
        this.username = username;
        this.password = password;
        this.readPrivilege = readPrivilege;
        this.downloadPrivilege = downloadPrivilege;
        this.uploadPrivilege = uploadPrivilege;
    }

    toJson()
    {
        //TODO: Hash, salt and encrypt before storing

        return {
            username: this.username,
            password: this.password,
            readPrivilege: this.readPrivilege,
            downloadPrivilege: this.downloadPrivilege,
            uploadPrivilege: this.uploadPrivilege
        };
    }

    static fromJson(json)
    {
        //TODO: Decrypt
        return new User(json["username"], json["password"], json["readPrivilege"], json["downloadPrivilege"], json["uploadPrivilege"]);
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