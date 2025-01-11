import { filesystemEntryType } from "../Constants/FilesystemEntryType.js";
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

    // getNodeAtPath(relativePath)
    // {
    //     let currentNode = this.root;
    //     const pathSegments = relativePath.split("/");

    //     for(const pathSegment of pathSegments)
    //     {
    //         for(const childDirectory of currentNode.childrenDirectories)
    //         {
    //             if(childDirectory.fileSystemMetaData.name == pathSegment)
    //             {
    //                 currentNode = childDirectory;
    //                 break;
    //             }
    //         }
    //     }
    //     return currentNode;
    // }
}

export default FileSystemTree;
