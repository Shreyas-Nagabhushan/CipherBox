import { fileExtensions } from "../Constants/FileExtensions.js";
import { paths } from "../Globals.js";
const path = require('path');

export function getServerDirectory()
{
    
    if(path.extname(paths["openedFrom"])!== fileExtensions.SERVER_FILE)
    {
        return "";
    }
    
    return path.dirname(paths["openedFrom"]);
}