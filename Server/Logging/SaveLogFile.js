const fs = require('fs');
const path = require('path');

import { getFormattedTimestamp } from '../../Common/Utility/GetFormattedTimeStamp.js';

self.onmessage = (event)=>
{
    const data = event.data;

    const message = data.message;
    const logsDirectory = data.logsDirectory;
    const logFileName = data.logFileName;

    const timeStamp = data.timeStamp;
    
    fs.appendFileSync(path.join(logsDirectory, logFileName), "["+ timeStamp + "]: " + message + "\n");
    
}