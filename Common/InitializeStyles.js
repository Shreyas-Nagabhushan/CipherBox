import { theme } from "./Constants/Theme.js"

export function initializeStyles()
{
    document.body.style.backgroundColor = theme.primaryBackgroundColor;
    document.body.style.fontFamily  = theme.fontFamily;
    document.body.style.color = theme.foregroundColor;
    
    const inputTextElements = document.querySelectorAll(`input[type="text"]`);
    
    for(const inputTextElement of inputTextElements)
    {
        inputTextElement.style.border = "solid white 2px";
        inputTextElement.style.borderRadius = "5px";
        inputTextElement.style.boxSizing = "border-box";
        inputTextElement.style.color = "white";
        inputTextElement.style.backgroundColor = theme.secondaryBackgroundColor;
        inputTextElement.style.fontSize = "20px";
        inputTextElement.style.padding = "5px";
    }
    
    document.querySelectorAll("button").forEach((button)=>
    {
        button.style.backgroundColor = theme.secondaryBackgroundColor; 
        button.style.fontSize = theme.mediumFontSize;
        button.style.color = theme.foregroundColor;
    });
}

