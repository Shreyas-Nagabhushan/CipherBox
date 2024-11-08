const express = require('express');
const fs = require("fs");

class Server
{
    constructor(port = 3000)
    {
        this.app = express();
        this.app.use(express.json());

        this.app.listen(port, () => 
        {
            console.log(`Server is running on http://localhost:${port}`);
        });

        
    }

    /*
        this.app.get("/getdirectorytree")
    */


}

export default Server;