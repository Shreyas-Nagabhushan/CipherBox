import { initializeStyles } from "../InitializeStyles.js";

window.navigationStack = [];
window.navigationStackPointer = -1;

window.openPage = (pageName)=>
{
    const pageContentDiv = document.getElementById("page-content");
    const newPage = document.createElement(pageName);

    if(newPage.initialize)
    {
        newPage.initialize();
    }   

    window.navigationStack.forEach((page)=>{ page.style.display = "none";});

    newPage.style.display = "flex";
    newPage.style.flexDirection = "column";
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

window.openPage("home-screen");