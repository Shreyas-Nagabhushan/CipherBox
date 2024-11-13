import { getFormattedTimestamp } from "../../Common/Utility/GetFormattedTimeStamp.js";

class Logging
{
    static logsDirectory = "";
    static logFileName = "Log" + String(Date.now()) + ".cblog";

    static initialize(logsDirectory)
    {
        Logging.logsDirectory = logsDirectory;
    }

    static log(message)
    {
        console.log(message);
        
        const logMessageEvent = new CustomEvent("console-log");
        window.dispatchEvent(logMessageEvent);

        const saverThread = new Worker(new URL("./SaveLogFile.js", import.meta.url), { type: "module" });
        saverThread.postMessage({ message: message, logsDirectory: Logging.logsDirectory, logFileName: Logging.logFileName });
    }
}

export default Logging;
