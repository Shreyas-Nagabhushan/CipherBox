import { fileExtensions } from "../../Common/Constants/FileExtensions.js";
import { logMessageType } from "../../Common/Constants/LogMessageType.js";
import { getFormattedTimestamp } from "../../Common/Utility/GetFormattedTimeStamp.js";

class Logging
{
    static logsDirectory = "";
    static logFileName = "Log" + String(Date.now()) + fileExtensions.LOG_FILE;

    static initialize(logsDirectory)
    {
        Logging.logsDirectory = logsDirectory;
    }

    static log(message, type=logMessageType.DEBUG)
    {
        console.log(message);
        
        const timeStamp = getFormattedTimestamp();
        const logMessageEvent = new CustomEvent("console-log", {detail: {message: message, type: type, timeStamp: timeStamp}});
        window.dispatchEvent(logMessageEvent);

        const saverThread = new Worker(new URL("./SaveLogFile.js", import.meta.url), { type: "module" });
        saverThread.postMessage({ message: message, logsDirectory: Logging.logsDirectory, logFileName: Logging.logFileName, timeStamp: timeStamp });
    }
}

export default Logging;
