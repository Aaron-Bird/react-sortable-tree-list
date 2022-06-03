import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './TreeNodeLine.less';
import { moveNodePosition, canMoveNode, handleDragStart, handleDragEnd } from '../utils';

import { TreeNodeContentProps, TreeNodeRender } from '../types';
const defaultOption = {
  indent: 20,
};

export const TreeNodeLine = (TreeNodeRender: TreeNodeRender, option: { [key: string]: any } = {}) => {
  option = Object.assign({}, defaultOption, option);
  return (props: TreeNodeContentProps) => {
    const { level } = props;
    const [active, setActive] = useState<string>(null);
    return (
      <div
        draggable="true"
        className={classNames([styles['tree-node']])}
        onDragStart={(e: React.DragEvent) => handleDragStart(e, props)}
        onDragEnter={(e: React.DragEvent) => handleDragEnter(e, props, setActive)}
        onDragLeave={(e: React.DragEvent) => handleDragLeave(e, props, setActive)}
        onDragOver={(e: React.DragEvent) => handleDragOver(e, props, setActive)}
        onDrop={(e: React.DragEvent) => handleDrop(e, props, setActive)}
        onDragEnd={(e: React.DragEvent) => handleDragEnd(e, props)}
      >
        <div
          className={classNames([
            styles['tree-node_content'],
            {
              [styles['tree-node_next--active']]: active === 'active-next',
              [styles['tree-node_prev--active']]: active === 'active-prev',
              [styles['tree-node--active']]: active === 'active',
            },
          ])}
          style={{ marginLeft: level * option.indent }}
        >
          {TreeNodeRender(props)}
        </div>
      </div>
    );
  };
};

const EDGE_HEIGHT = 10;
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

const handleDragOver = (e: React.DragEvent, props: any, setActive: SetState) => {
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
