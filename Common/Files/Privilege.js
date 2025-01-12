class Privilege 
{
    constructor(readPrivilege, downloadPrivilege, uploadPrivilege)
    {
        this.readPrivilege = readPrivilege;
        this.downloadPrivilege = downloadPrivilege;
        this.uploadPrivilege = uploadPrivilege;
    }

    toJson()
    {
        return {
            readPrivilege: this.readPrivilege,
            downloadPrivilege: this.downloadPrivilege,
            uploadPrivilege: this.uploadPrivilege
        };
    }

    fromJson()
    {
        return new Privilege(json["readPrivilege"], json["downloadPrivilege"], json["uploadPrivilege"]);
    }
}

export default Privilege;