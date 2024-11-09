import { selectionModes } from "../Common/Constants/SelectionModes.js";

const hostServerPopup = document.querySelector(".host-server-popup");

const serverPathFileSelector = document.createElement("file-selector");
serverPathFileSelector.initialize(selectionModes.FOLDER, "");
hostServerPopup.appendChild(serverPathFileSelector);