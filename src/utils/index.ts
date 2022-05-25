import { TreeNodeData } from '../types';

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
  const root: TreeNodeData = {
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

  if (!toParent.children) toParent.children = [];
  if (!fromParent.children) fromParent.children = [];

  if (fromNode === toNode) return { node: fromNode, move: false };
  // Disable move to child
  if (isChildNode(fromNode, toNode)) return { node: fromNode, move: false };

  toParent.children.splice(toIndex, 0, fromNode);
  if (fromParent === toParent && fromIndex > toIndex) fromIndex += 1;
  fromParent.children.splice(fromIndex, 1);
  return {
    node: fromNode,
    move: true,
  };
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

export { createRootNode, moveNodePosition, isChildNode, omit };
