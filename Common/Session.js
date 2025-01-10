class Session
{
    constructor()
    {
        this.aesKey = null;
        this.aesInitialVector = null;
        this.sessionToken = null;
        this.sessionStartTime = null;
    }

    toJson()
    {
        return {
            aesKey: this.aesKey,
            aesInitialVector: this.aesInitialVector,
            sessionToken: this.sessionToken,
            sessionStartTime: this.sessionStartTime
        };
    }

    static fromJson(json)
    {
        const session = new Session();
        
        session.aesKey = json["aesKey"];
        session.aesInitialVector = json["aesInitialVector"];
        session.sessionToken = json["sessionToken"];
        session.sessionStartTime = json["sessionStartTime"];

        return session;
    }
}

export default Session;