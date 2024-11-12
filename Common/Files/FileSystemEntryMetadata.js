import { filesystemEntryType } from '../Constants/FilesystemEntryType.js';
const path = require('path');

class FileSystemEntryMetadata
{
    constructor(fullPath)
    {
        this.fullPath = fullPath;
        this.extension = path.extname(this.fullPath);

        if(this.extension.length <= 0)
        {
            this.type = filesystemEntryType.DIRECTORY;
        }
        else
        {
            this.type = filesystemEntryType.FILE;
        }

        this.name = path.basename(this.fullPath, this.extension);

    }

    toJson() 
    {
        return {
            fullPath: this.fullPath,
            extension: this.extension,
            type: this.type,
            name: this.name
        };
    }

    static fromJson(json) 
    {
        const metadata = new FileSystemEntryMetadata(json.fullPath);
        metadata.extension = json.extension;
        metadata.type = json.type;
        metadata.name = json.name;
        
        return metadata;
    }
  
}

export default FileSystemEntryMetadata;