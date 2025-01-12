import FileSystemEntryMetadata from "../Files/FileSystemEntryMetadata.js";
import FileSystemTree from "../Files/FileSystemTree.js";
import FileSystemTreeNode from "../Files/FileSystemTreeNode.js";
import Privilege from "../Files/Privilege.js";
import { paths } from "../Globals.js";

export function createFileSystemTreeServer(rootDirectoryUploadPrivilege)
{
    const tree = new FileSystemTree();
    tree.filesDirectory = paths["filesDirectory"];

    const rootDirectoryPrivilege = new Privilege(0, null, rootDirectoryUploadPrivilege); 

    tree.root = new FileSystemTreeNode(new FileSystemEntryMetadata("", rootDirectoryPrivilege), null, [], []);

    return tree;
}

