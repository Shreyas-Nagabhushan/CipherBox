class Client
{
    static session = null;
    static user = null;
    static fileSystemTree = null;
    static serverIpWithPort = null;
    
    static reset()
    {
        session = null;
        user = null;
        fileSystemTree = null;
        serverIpWithPort = null;
    }


}

export default Client;
