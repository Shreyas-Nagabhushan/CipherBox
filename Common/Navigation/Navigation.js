import { paths } from "../Globals.js";
import { initializeStyles } from "../InitializeStyles.js";
import AdminDashboard from "../../Pages/AdminDashboard.js";
const path = require('path');

window.navigationStack = [];
window.navigationStackPointer = -1;

window.openPage = (pageName, ...args)=>
{   
    const pageContentDiv = document.getElementById("page-content");
    const newPage = document.createElement(pageName);

    if(newPage.initialize)
    {
        newPage.initialize(...args);
    }   

    window.navigationStack.forEach((page)=>{ page.style.display = "none";});

    newPage.style.display = "flex";
    newPage.style.flexDirection = "column";
    newPage.style.height = "100%";
    
    pageContentDiv.appendChild(newPage);

    window.navigationStack.length = window.navigationStackPointer + 1;

    window.navigationStack.push(newPage);
    window.navigationStackPointer++;

    const headerComponent = document.querySelector('header-component');
    
    if(window.navigationStackPointer <= 0)
    {
        headerComponent.hideBackButton();
    }
    else
    {
        headerComponent.showBackButton();
    }
    initializeStyles();

}

window.goBack = ()=>
{
    if(window.navigationStackPointer !== -1)
    {
        window.navigationStack[window.navigationStackPointer].style.display = "none";
        window.navigationStackPointer--;
        window.navigationStack[window.navigationStackPointer].style.display = "flex";
    }

    const headerComponent = document.querySelector('header-component');
    if(window.navigationStackPointer <= 0)
    {
        headerComponent.hideBackButton();
    }
    else
    {
        headerComponent.showBackButton();
    }
}

window.pop = ()=>
{
    if(window.navigationStackPointer !== -1)
    {
        window.navigationStack[window.navigationStackPointer].style.display = "none";

        window.navigationStack.pop();

        window.navigationStackPointer--;
        window.navigationStack[window.navigationStackPointer].style.display = "flex";
    }
}

window.clearAndOpenPage = (pageName)=>
{
    window.navigationStack.length = 0;
    window.openPage(pageName);
}

window.goNext = ()=>
{
    if(window.navigationStackPointer < (window.navigationStack.length -1))
    {
        window.navigationStack[window.navigationStackPointer].style.display = "none";
        window.navigationStackPointer++;
        window.navigationStack[window.navigationStackPointer].style.display = "flex";
        initializeStyles();
    }

    const headerComponent = document.querySelector('header-component');
    if(window.navigationStackPointer <= 0)
    {
        headerComponent.hideBackButton();
    }
    else
    {
        headerComponent.showBackButton();
    }
}







