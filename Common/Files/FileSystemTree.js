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
        //Use a custom event called "on-directory-change" after navigating
    }

    goUp()
    {
        //Use a custom event called "on-directory-change" after going back
    }

    getFilesInCurrentWorkingDirectory()
    {

    }

    getChildDirectoriesInCurrentWorkingDirectory()
    {
        
    }
}

export default FileSystemTree;
