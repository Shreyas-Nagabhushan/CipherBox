class User 
{
    constructor(username, password, readPrivilege, writePrivilege, downloadPrivilege)
    {
        this.username = username;
        this.password = password;
        this.readPrivilege = readPrivilege;
        this.writePrivilege = writePrivilege;
        this.downloadPrivilege = downloadPrivilege; 
    }

    toJson()
    {
        //TODO: Hash, salt and encrypt before storing

        return {
            username: this.username,
            password: this.password,
            readPrivilege: this.readPrivilege,
            writePrivilege: this.writePrivilege,
            downloadPrivilege: this.downloadPrivilege
        };
    }

    static fromJson(json)
    {
        //TODO: Decrypt
        return new User(json["username"], json["password"], json["readPrivilege"], json["writePrivilege"], json["downloadPrivilege"]);
    }
}

export default User;