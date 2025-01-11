class Session
{
    constructor()
    {
        this.aesKey = null;
        this.aesInitialVector = null;
        this.sessionToken = null;
        this.sessionStartTime = null;
        this.username = null;

    }

    toJson()
    {
        return {
            aesKey: this.aesKey,
            aesInitialVector: this.aesInitialVector,
            sessionToken: this.sessionToken,
            sessionStartTime: this.sessionStartTime,
            username: this.username
        };
    }

    toSendableJson()
    {
        return {
            sessionStartTime: this.sessionStartTime,
            sessionToken: this.sessionToken,
            username: this.username
        }
    }

    static fromJson(json)
    {
        const session = new Session();
        
        session.aesKey = json["aesKey"];
        session.aesInitialVector = json["aesInitialVector"];
        session.sessionToken = json["sessionToken"];
        session.sessionStartTime = json["sessionStartTime"];
        session.username = json["username"];

        return session;
    }
}

export default Session;