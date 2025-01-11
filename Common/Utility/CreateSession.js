import Encryption from "../EncryptionDecryption/Encryption.js";
import Session from "../Session.js";
import { generateUniqueId } from "./GenerateUniqueId.js";

export function createSession(username)
{
    const session = new Session();
    session.aesKey = Encryption.generateKeyAes();
    session.aesInitialVector = Encryption.generateInitialVectorAes();
    session.sessionStartTime = Date.now();
    session.sessionToken = generateUniqueId(32);
    session.username = username;
    return session;
}