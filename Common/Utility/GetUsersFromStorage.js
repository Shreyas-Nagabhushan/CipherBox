import { fileExtensions } from "../Constants/FileExtensions.js";
import { paths } from "../Globals.js";
import User from "../User.js";

const path = require("path");
const fs = require("fs");

export function getUsersFromStorage()
{
    const users = {};
    const usersFilesList = fs.readdirSync(paths["usersDirectory"]);

    for(const userFile of usersFilesList)
    {
        if(userFile.endsWith(fileExtensions.USER_FILE))
        {
            const userJson = JSON.parse(fs.readFileSync(path.join(paths["usersDirectory"], userFile)));
            const user = User.fromJson(userJson);
            users[user.username] = user;
        }
    }

    return users;
}