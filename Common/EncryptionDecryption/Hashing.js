
const sha256 = require('crypto-js/sha256');
class Hashing 
{
    static sha256(data)
    {   
        return sha256(data).toString();
    } 

}

export default Hashing;