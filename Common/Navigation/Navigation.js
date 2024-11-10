window.navigationStack = [];
window.navigationStackPointer = -1;
window.pages = window.pages? window.pages : {};

window.openPage = (pageName)=>
{
    const pageContentDiv = document.getElementById("page-content");
    const newPage = document.createElement(pageName);

    if(newPage.initialize)
    {
        newPage.initialize();
    }   

    window.navigationStack.forEach((page)=>{ page.style.display = "none";});

    pageContentDiv.style.display = "flex";
    pageContentDiv.style.flexDirection = "column";
    pageContentDiv.appendChild(newPage);

    window.navigationStack.length = window.navigationStackPointer + 1;

    window.navigationStack.push(newPage);
    window.navigationStackPointer++;
}

window.goBack = ()=>
{
    if(navigationStackPointer!== -1)
    {
        const pageContentDiv = document.getElementById("page-content");
        
    }
}

window.clearAndOpenPage = (pageName)=>
{
    window.navigationStack.length = 0;
}

window.goNext = ()=>
{
    if(window.navigationStackPointer < (window.navigationStack.length -1))
    {

    }
}