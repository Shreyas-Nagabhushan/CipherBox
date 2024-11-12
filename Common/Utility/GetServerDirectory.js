import { paths } from "../Globals.js";
const path = require('path');

export function getServerDirectory()
{
    
    if(path.extname(paths["openedFrom"])!== ".cboxsv")
    {
        return "";
    }
    
    return path.dirname(paths["openedFrom"]);
}