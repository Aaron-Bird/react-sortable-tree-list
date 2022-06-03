import { TreeData, TreeNodeData } from '../types';
export * from './event';

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

function insertBefore(dragged: any, target: any) {
  const { node: fromNode, parent: fromParent, index: fromIndex } = dragged;
  const { node, parent, index } = target;
  moveNodePosition(fromNode, fromParent, fromIndex, node, parent, index);
}

function insertAfter(dragged: any, target: any) {
  const { node: fromNode, parent: fromParent, index: fromIndex } = dragged;
  const { node, parent, index } = target;
  const toNodeNextIndex = index + 1;
  const toNodeNext = parent.children[toNodeNextIndex];
  if (toNodeNextIndex >= parent.children.length) {
    moveNodePosition(fromNode, fromParent, fromIndex, parent, parent, parent.children.length);
  } else {
    moveNodePosition(fromNode, fromParent, fromIndex, toNodeNext, parent, toNodeNextIndex);
  }
}

function appendChild(dragged: any, target: any) {
  const { node: fromNode, parent: fromParent, index: fromIndex } = dragged;
  const { node } = target;
  moveNodePosition(fromNode, fromParent, fromIndex, node, node, 0);
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

export { createRootNode, moveNodePosition, isChildNode, omit, canMoveNode, insertBefore, appendChild, insertAfter };
