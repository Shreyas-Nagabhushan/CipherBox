import { theme } from "../Common/Constants/Theme.js";

document.body.style.backgroundColor = theme.primaryBackgroundColor;
document.body.style.fontFamily = theme.fontFamily;
document.body.style.color = theme.foregroundColor;

const fs = require("fs");
const content = fs.readFileSync("F:/FasterThanMaggi/Saved/Logs/FasterThanMaggi.log")
console.log(content);
