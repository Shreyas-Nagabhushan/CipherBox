import { filesystemEntryType } from '../Constants/FilesystemEntryType.js';
import Privilege from './Privilege.js';

const path = require('path');

class FileSystemEntryMetadata
{
    constructor(relativePath, privilege = null)
    {
        this.relativePath = relativePath;
        this.extension = path.extname(this.relativePath);
        this.privilege = privilege; 

        if(this.extension.length <= 0)
        {
            this.type = filesystemEntryType.DIRECTORY;
            
        }
        else
        {
            this.type = filesystemEntryType.FILE;


        }

        this.name = path.basename(this.relativePath, this.extension);

    }

    toJson() 
    {
        return {
            relativePath: this.relativePath,
            extension: this.extension,
            type: this.type,
            name: this.name, 
            privilege: this.privilege ? this.privilege.toJson() : null
        };
    }

    static fromJson(json) 
    {
        const privilege = json["privilege"] ? Privilege.fromJson(json["privilege"]) : null;

        const metadata = new FileSystemEntryMetadata(json.relativePath, privilege);
    

        metadata.extension = json.extension;
        metadata.type = json.type;
        metadata.name = json.name;
        
        return metadata;
    }
  
}

export default FileSystemEntryMetadata;