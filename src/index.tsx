import React, { useReducer, useMemo } from 'react';
import { Tree, TreeNode, NodeRenderer, OnChange } from './types';
import { createRootNode, moveNodePosition, isChildNode } from './utils';
import styles from './index.less';

import {
  handleDrag,
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleDragEnd,
} from './event';

interface SortableTreeProps {
  nodeList: TreeNode[];
  children: NodeRenderer;
  onChange?: OnChange;
  style: any;
}

export default function SortableTree(props: SortableTreeProps) {
  let { nodeList, children: NodeRenderer, onChange, style } = props;

  if (!Array.isArray(nodeList)) throw new Error('nodeList must be an Array');
  if (!nodeList.length) return <div className="sortable-tree"></div>;
  if (typeof NodeRenderer !== 'function') NodeRenderer = ({ node }) => <div></div>;
  if (!onChange) onChange = () => {};

  return createTree(nodeList, NodeRenderer, onChange, style);
}

interface TreeState {
  dragged: { node: TreeNode; parent: TreeNode | Tree };
}
interface TreeAction {
  type: 'dragged';
  payload: any;
}

function createTree(nodeList: TreeNode[], NodeRenderer: NodeRenderer, onChange: OnChange, style: any) {
  const rootNode = useMemo(() => createRootNode(nodeList), [nodeList]);
  const [treeState, treeDispatch] = useReducer(
    (state: TreeState, action: TreeAction) => {
      switch (action.type) {
        case 'dragged':
          return { dragged: action.payload };
        default:
          throw new Error('Unknown dispatch type: ' + action.type);
      }
    },
    {
      dragged: null,
    }
  );
  const props = {
    children: rootNode.children,
    NodeRenderer,
    level: 0,
    nodeList,
    treeState,
    treeDispatch,
    parent: rootNode,
    onChange,
    style,
  };

  const lastNode = rootNode.children[rootNode.children.length - 1];
  return (
    <div className="sortable-tree" style={style}>
      {createTreeChildren(props)}
      {treeState.dragged && rootNode.children.length && (
        <div
          className={styles['tree-node-next']}
          onDragEnter={(e: React.DragEvent) => handleDragEnter(e, { ...props, node: lastNode })}
          onDragLeave={(e: React.DragEvent) => handleDragLeave(e, { ...props, node: lastNode })}
          onDragOver={(e: React.DragEvent) => handleDragOver(e)}
          onDrop={(e: React.DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
            const { node: fromNode, parent: fromParent, index: fromIndex } = treeState.dragged;
            const { move } = moveNodePosition(
              fromNode,
              fromParent,
              fromIndex,
              lastNode,
              rootNode,
              rootNode.children.length
            );
            if (move) onChange(rootNode.children);
          }}
        ></div>
      )}
    </div>
  );
}

interface CreateTreeChildrenProps {
  children: TreeNode[];
  parent: TreeNode | Tree;
  level: number;
  nodeList: TreeNode[];
  NodeRenderer: NodeRenderer;
  treeState: { dragged: TreeNode };
  treeDispatch: React.Dispatch<TreeAction>;
  onChange: OnChange;
}

function createTreeChildren(props: CreateTreeChildrenProps) {
  const { children, NodeRenderer, level, nodeList, treeState, treeDispatch, parent, onChange } = props;
  return children.map((node, index) => {
    if (!node.children) node.children = [];
    if (!Array.isArray(node.children)) throw new Error('children must be a Array');

    return (
      <div className={styles['tree-node']} key={level + '-' + index}>
        {treeState.dragged && (
          <div
            className={styles['tree-node-prev']}
            onDragEnter={(e: React.DragEvent) => handleDragEnter(e, { ...props, node })}
            onDragLeave={(e: React.DragEvent) => handleDragLeave(e, { ...props, node })}
            onDragOver={(e: React.DragEvent) => handleDragOver(e)}
            onDrop={(e: React.DragEvent) => {
              e.stopPropagation();
              e.preventDefault();
              if (!treeState.dragged) return;
              const { node: fromNode, parent: fromParent, index: fromIndex } = treeState.dragged;
              const { move } = moveNodePosition(fromNode, fromParent, fromIndex, node, parent, index);
              if (move) onChange(nodeList);
            }}
          ></div>
        )}
        {
          <div
            className={styles['tree-node-content']}
            draggable={true}
            onDragStart={(e: React.DragEvent) => handleDragStart(e, { ...props, node, index })}
            onDragEnter={(e: React.DragEvent) => handleDragEnter(e, { ...props, node })}
            onDragLeave={(e: React.DragEvent) => handleDragLeave(e, { ...props, node })}
            onDragOver={(e: React.DragEvent) => e.preventDefault()}
            onDrop={(e: React.DragEvent) => handleDrop(e, { ...props, node })}
            onDragEnd={(e: React.DragEvent) => handleDragEnd(e, { ...props, node })}
          >
            {NodeRenderer({ node, level, nodeList })}
          </div>
        }
        {!node.folder &&
          Array.isArray(node.children) &&
          createTreeChildren({
            children: node.children,
            parent: node,
            NodeRenderer,
            level: level + 1,
            nodeList,
            treeState,
            treeDispatch,
            onChange,
          })}
      </div>
    );
  });
}

export { SortableTree, TreeNode };
