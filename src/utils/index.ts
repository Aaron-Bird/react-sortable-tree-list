import { TreeData, TreeNodeData } from '../types';

function omit(object: object, paths: string[]): object {
  const newObject: { [key: string]: any } = {};
  for (let [key, value] of Object.entries(object)) {
    if (!paths.includes(key)) {
      newObject[key] = value;
    }
  }
  return newObject;
}

function createRootNode(nodeList: TreeNodeData[]) {
  const root: TreeData = {
    root: true,
    children: nodeList,
  };
  return root;
}

function moveNodePosition(
  fromNode: TreeNodeData,
  fromParent: TreeNodeData,
  fromIndex: number,
  toNode: TreeNodeData, 
  toParent: TreeNodeData,
  toIndex: number
) {
  if (fromIndex == undefined || toIndex == undefined) throw new Error('Wrong params');
  const fromParentChildren = fromParent.children || [];
  const toParentChildren = toParent.children || [];

  toParentChildren.splice(toIndex, 0, fromNode);
  if (fromParent === toParent && fromIndex > toIndex) fromIndex += 1;
  fromParentChildren.splice(fromIndex, 1);
}

function isChildNode(parentNode: TreeNodeData, childNode: TreeNodeData) {
  const list = [...(parentNode.children || [])];
  while (list.length) {
    const node = list.shift() as TreeNodeData;
    if (node === childNode) {
      return true;
    }
    if (Array.isArray(node.children)) {
      node.children.forEach((i: TreeNodeData) => list.push(i));
    }
  }
  return false;
}

function canMoveNode(fromNode: TreeNodeData, toNode: TreeNodeData) {
  return fromNode && fromNode !== toNode && !isChildNode(fromNode, toNode);
}

export { createRootNode, moveNodePosition, isChildNode, omit, canMoveNode };
