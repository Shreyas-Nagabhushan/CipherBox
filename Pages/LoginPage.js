import { theme } from '../Common/Constants/Theme.js';
import ServerBrowser from "../Client/ServerBrowser.js";
import Server from "../Server/Server.js";
import { statusCodes } from '../Common/Constants/StatusCodes.js';
import Logging from '../Server/Logging/Logging.js';
import FileSystemTree from '../Common/Files/FileSystemTree.js';
import ClientDashboard from './ClientDashboard.js';
import Hashing from '../Common/EncryptionDecryption/Hashing.js';
import Encryption from '../Common/EncryptionDecryption/Encryption.js';
class LoginPage extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(ipWithPort)
    {
        this.ipWithPort = ipWithPort;
    }
    connectedCallback()
    {
        this.style.display = "flex";
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        this.innerHTML = `
            <style>
                .login-component
                {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    height:100%;
                    border: 2px solid white;
                    width: 50%;
                    height: 50%;
                    border-radius: 15px;
                }
                
                .login-button
                {
                    font-size: 20px;
                    cursor: pointer;
                }
            </style>
            <div class = "login-component">
                <input type="text" class="username-input" placeholder="Enter User-ID"></input>
                <input type="password" class="password-input" placeholder="Enter Password"></input>
                <button class="login-button">Login</button>
            </div>
        `;

        //Temporary trying out to link the server-browser with the LOGIN button.
        const loginButtonAction = document.querySelector(".login-button");

        loginButtonAction.addEventListener("click", async (event) => 
        {
            const username = this.querySelector(".username-input").value;
            const password = this.querySelector(".password-input").value;

            const hashedPassword = Hashing.sha256(password);

            const response = await fetch
            (
                `http://${this.ipWithPort}/`,
                {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify
                    ({
                        username: username,
                        password: hashedPassword, 
                    }),
                }
            );


            const responseJson = await response.json();
            
            console.log(responseJson);
            
            if(responseJson["status"] == statusCodes.OK)
            {
                // const tree = FileSystemTree.fromJson(responseJson.data);
                // Logging.log(tree);
                // window.openPage("client-dashboard", tree);
                Encryption.generateKeyPairRsa();

                const keyExchangeResponse = await fetch
                (
                    `http://${this.ipWithPort}/keyExchange`,
                    {
                        method:'POST',
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify
                        ({
                            username: username,
                            rsaPublicKey: Encryption.rsaPublicKey
                        }),

                    }
                );

                const keyExchangeResponseJson = await keyExchangeResponse.json();

                if(keyExchangeResponseJson["status"] == statusCodes.OK)
                {
                    
                }

            }
            else
            {
                //TODO: alert, display message
                Logging.log(responseJson["message"]);
            }

            
        });
    }
}

customElements.define("login-page", LoginPage);
export default LoginPage;