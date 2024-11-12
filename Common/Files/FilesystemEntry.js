import { filesystemEntryType } from "../Constants/FilesystemEntryType.js";

class FilesystemEntry 
{
    constructor(entryType, name, privilege, directoryContents = [])
    {
        this.entryType = entryType;
        this.name = name;
        this.privilege = privilege;
        this.directoryContents = directoryContents;
    }
}

export default FilesystemEntry;