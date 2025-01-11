import { filesystemEntryType } from '../Constants/FilesystemEntryType.js';

const path = require('path');

class FileSystemEntryMetadata
{
    constructor(relativePath)
    {
        this.relativePath = relativePath;
        this.extension = path.extname(this.relativePath);

        if(this.extension.length <= 0)
        {
            this.type = filesystemEntryType.DIRECTORY;
        }
        else
        {
            this.type = filesystemEntryType.FILE;
            // this.readPrivilege = 

        }

        this.name = path.basename(this.relativePath, this.extension);

    }

    toJson() 
    {
        return {
            relativePath: this.relativePath,
            extension: this.extension,
            type: this.type,
            name: this.name
        };
    }

    static fromJson(json) 
    {
        const metadata = new FileSystemEntryMetadata(json.relativePath);
        metadata.extension = json.extension;
        metadata.type = json.type;
        metadata.name = json.name;
        
        return metadata;
    }
  
}

export default FileSystemEntryMetadata;