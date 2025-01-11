class EncryptedData
{
    constructor(data, privateKey = null, publicKey = null, initialVector = null)
    {
        if(data instanceof Buffer)
        {
            this.data = data;
            this.privateKey = privateKey;
            this.publicKey = publicKey;
            this.initialVector = initialVector;
        }
        else
        {
            console.error("Incorrect data format!");
        }
    }

    toJson()
    {
        const result =
        {
            data:this.data,
            privateKey: this.privateKey,
            publicKey: this.publicKey,
            initialVector: this.initialVector,
        };
        for(const key in result)
        {
            if(result[key]===null)
            {
                delete result[key];
            }
        }
        return result;
    }

    static fromJson()
    {
        if (typeof json !== "object" || json === null)
        {
            console.error("Invalid JSON object.");
            return null;
        }
        const { data, privateKey = null, publicKey = null, initialVector = null } = json;
    
        if (!(data instanceof Uint8Array)) 
        {
            console.error("Incorrect data format.");
            return null;
        }
    
        return new EncryptedData(data, privateKey, publicKey, initialVector);
    }

}

export default EncryptedData;