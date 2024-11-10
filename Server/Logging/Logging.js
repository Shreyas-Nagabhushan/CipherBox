import { getFormattedTimestamp } from "../../Common/Utility/GetFormattedTimeStamp.js";

class Logging
{
    static logsDirectory = "";
    static logFileName = getFormattedTimestamp();

    static initialize(logsDirectory)
    {
        Logging.logsDirectory = logsDirectory;
    }

    static log(message)
    {
        console.log(message);
        const saverThread = new Worker(new URL("./SaveLogFile.js"),{ type: "module" });
        saverThread.postMessage({ message: message, logsDirectory: Logging.logsDirectory, logFileName: Logging.logFileName });
    }
}

export default Logging;
