import FileSystemEntryMetadata from "./FileSystemEntryMetadata.js";


/*
    Each directory will be a FileSystemTreeNode 
    The files and folders under the directory will be the children
    The the fileSystemMetaData is the metadata of the directory(current Node)

*/
class FileSystemTreeNode
{
    constructor(fileSystemMetaData, parentDirectory = null, childrenDirectories = [], files = [])
    {
        if(fileSystemMetaData instanceof FileSystemEntryMetadata)
        {
            this.fileSystemMetaData = fileSystemMetaData;
        }

        //Parent Directory is a tree node
        this.parentDirectory = parentDirectory;

        //Children Directories is an array of tree nodes
        this.childrenDirectories= childrenDirectories; 

        //Files is an array of FileSystemEntryMetadata
        this.files = files;
    }

    toJson()
    {
        return {
            fileSystemMetaData: this.fileSystemMetaData.toJson(),
            childrenDirectories: this.childrenDirectories.map(child => child.toJson()),
            files: this.files.map(file => file.toJson())
        }
    }

    static fromJson(json)
    {
        const fileSystemMetaData = FileSystemEntryMetadata.fromJson(json.fileSystemMetaData);

        const childrenDirectories = json.childrenDirectories.map((child) => 
        { 
            return FileSystemTreeNode.fromJson(child)
        });

        const files = json.files.map(file => FileSystemEntryMetadata.fromJson(file));
        const currentDirectoryNode = new FileSystemTreeNode(fileSystemMetaData, null, childrenDirectories, files);
        
        for(const child of childrenDirectories)
        {
            child.parentDirectory = currentDirectoryNode;
        }

        return currentDirectoryNode;
    }
}

export default FileSystemTreeNode;