import React from 'react';
import styles from './index.less';
import { moveNodePosition, isChildNode } from './utils';

function handleDrag(e: React.DragEvent) {
  e.stopPropagation();
  e.preventDefault();
}

function handleDragStart(e: React.DragEvent, props: any) {
  const { treeDispatch, node, parent, index } = props;
  e.stopPropagation();
  setTimeout(() => {
    treeDispatch({
      type: 'dragged',
      payload: {
        node,
        parent,
        index,
      },
    });
  }, 0);
}

function handleDragEnter(e: React.DragEvent, props: any) {
  e.stopPropagation();
  e.preventDefault();
  const { treeState, node } = props;
  const fromNode = treeState?.dragged.node;
  if (fromNode && fromNode !== node && !isChildNode(fromNode, node)) {
    e.currentTarget.classList.add(styles['active']);
  }
}

function handleDragLeave(e: React.DragEvent, props: any) {
  e.stopPropagation();
  e.preventDefault();
  e.currentTarget.classList.remove(styles['active']);
}

const handleDragOver = (e: React.DragEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

function handleDrop(e: React.DragEvent, props: any) {
  e.stopPropagation();
  e.preventDefault();
  e.currentTarget.classList.remove(styles['active']);

  const { node, parent, index, treeState, onChange, nodeList } = props;
  const { node: fromNode, parent: fromParent, index: fromIndex, el: fromEl } = treeState.dragged;
  if (fromNode === node) return;

  const { move } = moveNodePosition(fromNode, fromParent, fromIndex, node, node, node.children.length);
  if (move) onChange(nodeList);
}

function handleDragEnd(e: React.DragEvent, props: any) {
  e.stopPropagation();
  e.preventDefault();
  const { treeDispatch, node } = props;
  treeDispatch({ type: 'dragged', payload: null });
}

export { handleDrag, handleDragStart, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleDragEnd };
