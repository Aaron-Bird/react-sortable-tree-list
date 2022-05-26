import React from 'react';
import { moveNodePosition, isChildNode } from './utils';
import styles from './index.less';

function handleDrag(e: React.DragEvent) {
  e.stopPropagation();
  e.preventDefault();
}

function handleDragStart(e: React.DragEvent, props: any) {
  const { treeDispatch, node, parent, index, treeState } = props;
  e.stopPropagation();
  treeDispatch({
    type: 'dragged',
    payload: {
      node,
      parent,
      index,
    },
  });
}

type SetState = React.Dispatch<React.SetStateAction<string>>;
function handleDragEnter(e: React.DragEvent, props: any, setState: SetState) {
  e.stopPropagation();
  e.preventDefault();
  // const { treeState, node, draggedRef } = props;
  // const fromNode = treeState?.dragged.node;

  // if (fromNode && fromNode !== node && !isChildNode(fromNode, node)) {
  // e.currentTarget.classList.add(styles['active']);
  // }
}

function handleDragLeave(e: React.DragEvent, props: any, setState: SetState) {
  e.stopPropagation();
  e.preventDefault();
  setState(null);
}

const handleDragOver = (
  e: React.DragEvent,
  props: any,
  treeNodeRef: React.RefObject<HTMLElement>,
  setActive: SetState
) => {
  e.stopPropagation();
  e.preventDefault();
  const { treeState, node } = props;
  if (!treeState.dragged || !node) return;
  if (treeState.dragged?.node === node) return;

  const fromNode = treeState?.dragged.node;
  if (fromNode && fromNode !== node && !isChildNode(fromNode, node)) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    if (mouseY < 8) {
      setActive('active-prev');
    } else if (rect.height - mouseY < 8) {
      setActive('active-next');
    } else {
      setActive('active');
    }
  }
};

function handleDrop(e: React.DragEvent, props: any, setState: SetState) {
  e.stopPropagation();
  e.preventDefault();
  setState(null);
  e.currentTarget.classList.remove(styles['active']);
  const { node, treeState, onChange, nodeList, treeDispatch } = props;

  const { node: fromNode, parent: fromParent, index: fromIndex, el: fromEl } = treeState.dragged;
  if (fromNode === node) return;

  const { move } = moveNodePosition(fromNode, fromParent, fromIndex, node, node, node.children.length);
  treeDispatch({ type: 'dragged', payload: null });
  if (move) onChange(nodeList);
}

function handleDragEnd(e: React.DragEvent, props: any) {
  e.stopPropagation();
  e.preventDefault();

  const { treeDispatch } = props;
  treeDispatch({ type: 'dragged', payload: null });
}

export { handleDrag, handleDragStart, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleDragEnd };
