import { theme } from "./Constants/Theme.js"

export function initializeStyles()
{
    document.body.style.backgroundColor = theme.primaryBackgroundColor;
    document.body.style.fontFamily  = theme.fontFamily;
    document.body.style.color = theme.foregroundColor;
    
    const inputTextElements = document.querySelectorAll(`input[type="text"],input[type="password"],input[type="number"]`);
    
    for(const inputTextElement of inputTextElements)
    {
        inputTextElement.style.border = "solid white 2px";
        inputTextElement.style.borderRadius = "5px";
        inputTextElement.style.boxSizing = "border-box";
        inputTextElement.style.color = "white";
        inputTextElement.style.backgroundColor = theme.secondaryBackgroundColor;
        inputTextElement.style.fontSize = "20px";
        inputTextElement.style.margin = "5px 5px";
    }
    
    const buttons = document.querySelectorAll("button");

    for(const button of buttons)
    {
        // button.addEventListener("mouseover")
        button.style.backgroundColor = theme.secondaryBackgroundColor;
        button.style.border = "solid white 2px";
        button.style.color = theme.foregroundColor;
        button.style.margin = "2px";
        button.style.padding = "2px";

        button.addEventListener("mouseenter", ()=>
        {
            // button.style.border = "solid yellow 2px";
            button.style.border = `solid ${theme.buttonOnHoverColor} 2px`;
            button.style.color = theme.buttonOnHoverColor;
            button.style.cursor = "pointer";

        });

        button.addEventListener("mouseleave", ()=>
        {
            button.style.border = "solid white 2px";
            button.style.color = "white";
        });
    }

    // document.querySelectorAll("button").forEach((button)=>
    // {
    //     button.style.backgroundColor = theme.secondaryBackgroundColor;
    //     button.style.border = "solid white 2px";
    //     button.style.color = theme.foregroundColor;
    //     button.style.margin = "2px";
    //     button.style.padding = "2px";
        // button.addEventListener("hover", ()=>{
        //     button.style.border = "solid yellow 2px";
        //     button.backgroundColor = "red";
        // });
    // });
}

