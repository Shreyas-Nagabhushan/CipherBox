import { filesystemEntryType } from "../Constants/FilesystemEntryType.js";
import { paths } from "../Globals.js";
import FileSystemEntryMetadata from "./FileSystemEntryMetadata.js";
import FileSystemTreeNode from "./FileSystemTreeNode.js";

const fs = require("fs");
const path = require("path");

//Node is FileSystemTreeNode
class FileSystemTree
{
    constructor()
    {

    }

    constructTreeServer(initialPath, currentNode)
    {
        if(currentNode instanceof FileSystemTreeNode)
        {
            const files = fs.readdirSync(initialPath);

            for(const file of files)
            {
                //check if the extension is not equal to .DS_Store
                if(file == ".DS_Store")
                {
                    continue;
                }

                const fullPath = path.join(initialPath, file);
                const relativePath = path.relative(this.filesDirectory, fullPath);

                const fileSystemEntry = new FileSystemEntryMetadata(relativePath);   

                if(fileSystemEntry.type == filesystemEntryType.DIRECTORY)
                {
                    const childNode = new FileSystemTreeNode(fileSystemEntry, currentNode, [], []);
                    currentNode.childrenDirectories.push(childNode); 
                    this.constructTreeServer(fullPath, childNode);
                }
                else 
                {
                    currentNode.files.push(fileSystemEntry);
                }
            }
        }
    }


    toJson()
    {
        return {
            root: this.root.toJson(),
        };
    }

    static fromJson(json)
    {
        const root = FileSystemTreeNode.fromJson(json.root);
        const tree = new FileSystemTree();

        tree.root = root;
        tree.current = root;

        return tree;
    }

    navigate(directoryNameInCurrentWorkingDirectory)
    {
        const directoryToNavigate = directoryNameInCurrentWorkingDirectory;
        for(const childDirectory of this.current.childrenDirectories)
        {
            if(childDirectory.fileSystemMetaData.name == directoryToNavigate)
            {
                this.current = childDirectory;
                break;
            }
        }
        //Use a custom event called "on-directory-change" after navigating
        const directoryChangeEvent = new CustomEvent("on-directory-change");
        window.dispatchEvent(directoryChangeEvent);
    }

    goUp()
    {   
        this.current=this.current.parentDirectory;
        //Use a custom event called "on-directory-change" after going back
        const directoryChangeEvent = new CustomEvent("on-directory-change");
        window.dispatchEvent(directoryChangeEvent);
    }

    getFilesInCurrentWorkingDirectory()
    {
        return this.current.files;
    }

    getChildDirectoriesInCurrentWorkingDirectory()
    {
        return this.current.childrenDirectories;       
    }

    getFileMetaDataFromRelativePath(relativePath)
    {
        const directoryPath = path.dirname(relativePath);
        const normalizedPath = path.normalize(directoryPath)
        const pathSegments = normalizedPath.split(path.sep);
        
        this.current = this.root;

        for(const pathSegment of pathSegments)
        {
            this.navigate(pathSegment);
        }

        for(const fileSystemEntryMetaData of this.current.files)
        {
            if(fileSystemEntryMetaData.relativePath == relativePath)
            {
                this.current = this.root;
                return fileSystemEntryMetaData;
            }
        }

        
        this.current = this.root;
        return null;
    }

    getDirectoryMetaDataFromRelativePath(relativePath)
    {
        const normalizedPath = path.normalize(relativePath)
        const pathSegments = normalizedPath.split(path.sep);
        
        this.current = this.root;

        for(const pathSegment of pathSegments)
        {
            this.navigate(pathSegment);
        }

        const fileSystemMetaData = this.current.fileSystemMetaData;
        this.current = this.root;

        return fileSystemMetaData;
    }

    getFileFromRelativePath(relativePath)
    {
        const normalizedPath = path.normalize(relativePath)
        const pathSegments = normalizedPath.split(path.sep);
        let currentNode = this.root;

        const recursiveFunction = (pathSegments, currentNode) =>
        {
            if(pathSegments.length == 1) 
            {
                //Should return file
                for(const fileSystemEntryMetaData of currentNode.files)
                {
                    if(fileSystemEntryMetaData.relativePath == relativePath)
                    {
                        return fs.readFileSync(path.join(paths["filesDirectory"], fileSystemEntryMetaData.relativePath), { encoding: "base64" });
                    }
                    else 
                    {
                        console.log("file name not matching");
                    }
                }
            }
            else 
            {
                //Should navigate to child directory 
                const pathSegment = pathSegments[0];
                for(const childDirectory of currentNode.childrenDirectories)
                {
                    if(childDirectory.fileSystemMetaData.name == pathSegment)
                    {
                        return recursiveFunction(pathSegments.slice(1), childDirectory);
                    }
                }
            }
        }; 

        return recursiveFunction(pathSegments, currentNode);
    }

    save()
    {
        const fileSystemTreeJson = this.toJson(); 
        const serverFilePath = paths["serverFile"]; 
        fs.writeFileSync(serverFilePath, JSON.stringify(fileSystemTreeJson));
    }
    
}

export default FileSystemTree;
