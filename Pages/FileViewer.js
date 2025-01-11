const path = require("path");

class FileViewer extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(relativePath, fileContent)
    {
        this.relativePath = relativePath;
        this.fileContent = fileContent;
    }

    applyStyles()
    {
        const fileHeader = this.querySelector(".file-header");
        const fileHeaderText = this.querySelector(".file-header-text");
        const fileContent = this.querySelector(".file-content"); 

        this.style.display = "flex";
        this.style.flex = 1;
        this.style.flexDirection = "column";
        this.style.width = "100%"; 

        fileHeader.style.display = "flex";
        fileHeader.style.flex = 1;
        fileHeader.style.width = "100%";
        fileHeader.style.alignItems = "center";
        fileHeader.style.justifyContent = "center";

        fileContent.style.flex = 7;
        fileContent.style.width = "100%";
        fileContent.style.alignItems = "center";
        // fileContent.style.justifyContent = "center";

        fileHeaderText.innerText = path.basename(this.relativePath);

        fileContent.innerText = this.fileContent;
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div class="file-header">
                <h1 class="file-header-text"></h1>
            </div>

            <pre class="file-content">
            </pre>
        `;

        this.applyStyles();
    }
}

customElements.define("file-viewer", FileViewer);
export default FileViewer;