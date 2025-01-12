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

    // made the function 'static'.. 77
    // added 'json' parameter.. 77
    static fromJson(json)   
    {
        return new Privilege(json["readPrivilege"], json["downloadPrivilege"], json["uploadPrivilege"]);
    }
}

export default Privilege;