const path = require("path");
const fs = require("fs");

export function createServerFile(serverDirectory, serverName)
{
    console.log("Server Directory: " + serverDirectory);
    console.log("Server Name: " + serverName);

    if(!serverName)
    {
        return false;
    }

    //If server already exists with the same name in same directory, then name is invalid
    if(fs.existsSync(path.join(serverDirectory, serverName)))
    {
        return false;
    }

    const serverPath = path.join(serverDirectory, serverName);
    fs.mkdirSync(serverPath);

    const serverFilePath = path.join(serverDirectory, serverName, (serverName + ".cboxsv"));
    fs.writeFileSync(serverFilePath, "");

    return true;
}



/*
//Assuming that the project name and directory is valid
    createProjectInSelectedDirectory()
    {
        const projectPath = path.join(this.projectDirectory, this.projectName);
        fs.mkdirSync(projectPath);

        //Create the project file
        //Should contain the details about the author, liscencing etc
        const projectFileFullPath = path.join(this.projectDirectory, this.projectName, (this.projectName + ".capproject"));
        fs.writeFileSync(projectFileFullPath, "{}");
        fs.mkdirSync(path.join(this.projectDirectory, this.projectName, "Compiled"));
        fs.mkdirSync(path.join(this.projectDirectory, this.projectName, "Config"));
        fs.mkdirSync(path.join(this.projectDirectory, this.projectName, "Content"));
    }   

    isValidProjectName(name)
    {
        if(!name)
        {
            alert("Project name cannot be empty!");
            return false;
        }

        //If project already exists with the same name in same directory, then name is invalid
        if(fs.existsSync(path.join(this.projectDirectory, name)))
        {
            alert("Project name already exists!");
            return false;
        }

        return true;
    }
*/