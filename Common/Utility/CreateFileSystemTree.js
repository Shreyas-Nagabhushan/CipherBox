import FileSystemEntryMetadata from "../Files/FileSystemEntryMetadata.js";
import FileSystemTree from "../Files/FileSystemTree.js";
import FileSystemTreeNode from "../Files/FileSystemTreeNode.js";
import { paths } from "../Globals.js";

export function createFileSystemTreeServer()
{
    const tree = new FileSystemTree();
    tree.filesDirectory = paths["filesDirectory"];
    tree.root = new FileSystemTreeNode(new FileSystemEntryMetadata(""), null, [], []);
    tree.constructTreeServer(tree.filesDirectory, tree.root);

    return tree;
}

