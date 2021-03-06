import React from 'react';
import { moveNodePosition, canMoveNode } from './index';
const EDGE_HEIGHT = 10;

function handleDrag(e: React.DragEvent) {
  e.stopPropagation();
  e.preventDefault();
}

function handleDragStart(e: React.DragEvent, props: any) {
  const { treeDispatch, node, parent, index, updateComponent, parentUpdateComponent } = props;
  e.stopPropagation();
  treeDispatch({
    type: 'dragged',
    payload: {
      node,
      parent,
      index,
      updateComponent: updateComponent,
      parentUpdateComponent: parentUpdateComponent,
    },
  });
}

type SetState = React.Dispatch<React.SetStateAction<string>>;
function handleDragEnter(e: React.DragEvent, props: any, setState: SetState) {
  e.stopPropagation();
  e.preventDefault();
}

function handleDragLeave(e: React.DragEvent, props: any, setActive: SetState) {
  e.stopPropagation();
  e.preventDefault();
  setActive(null);
}

const handleDragOver = (
  e: React.DragEvent,
  props: any,
  setActive: SetState
) => {
  e.stopPropagation();
  e.preventDefault();
  const { treeState, node } = props;
  if (!treeState.dragged || !node) return;
  if (treeState.dragged?.node === node) return;

  const fromNode = treeState?.dragged.node;
  if (canMoveNode(fromNode, node)) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    if (mouseY < EDGE_HEIGHT) {
      setActive('active-prev');
    } else if (rect.height - mouseY < EDGE_HEIGHT) {
      setActive('active-next');
    } else {
      setActive('active');
    }
  }
};

function handleDrop(e: React.DragEvent, props: any, setActive: SetState) {
  e.stopPropagation();
  e.preventDefault();
  setActive(null);
  const {
    node,
    treeState,
    onChange,
    nodeList,
    treeDispatch,
    parent,
    index,
    updateComponent: toUpdateComponent,
    parentUpdateComponent: toParentUpdateComponent,
  } = props;
  const {
    node: fromNode,
    parent: fromParent,
    index: fromIndex,
    el: fromEl,
    updateComponent: fromUpdateComponent,
    parentUpdateComponent: fromParentUpdateComponent,
  } = treeState.dragged;
  treeDispatch({ type: 'dragged', payload: null });

  if (canMoveNode(fromNode, node)) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    if (mouseY < EDGE_HEIGHT) {
      moveNodePosition(fromNode, fromParent, fromIndex, node, parent, index);

      if (fromParent !== parent) {
        toParentUpdateComponent();
      }
    } else if (rect.height - mouseY < EDGE_HEIGHT) {
      const toNodeNextIndex = index + 1;
      const toNodeNext = parent.children[toNodeNextIndex];
      if (toNodeNextIndex >= parent.children.length) {
        moveNodePosition(fromNode, fromParent, fromIndex, parent, parent, parent.children.length);
      } else {
        moveNodePosition(fromNode, fromParent, fromIndex, toNodeNext, parent, toNodeNextIndex);
      }

      if (fromParent !== parent) {
        toParentUpdateComponent();
      }
    } else {
      moveNodePosition(fromNode, fromParent, fromIndex, node, node, 0);
      toUpdateComponent();
    }

    fromParentUpdateComponent();
    onChange(nodeList);
  }
}

function handleDragEnd(e: React.DragEvent, props: any) {
  e.stopPropagation();
  e.preventDefault();

  const { treeDispatch } = props;
  treeDispatch({ type: 'dragged', payload: null });
}

export { handleDrag, handleDragStart, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleDragEnd };
