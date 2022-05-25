import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from '../index.less';
import { TreeNodeChildren } from './TreeNodeChildren';
import { TreeNodeContent } from './TreeNodeContent';
import { handleDragEnter, handleDragLeave } from '../event';
import { moveNodePosition } from '../utils';

const TreeNode = React.memo((props: any) => {
  const { NodeRenderer, nodeList, treeState, treeDispatch, onChange, level, parent, node, index } = props;
  const [activePrev, setActivePrev] = useState(false);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const nodeInfo = useMemo(() => {
    return {
      NodeRenderer,
      node,
      active,
      index,
      setActive,
      dragging,
      setDragging,
      level,
      nodeList,
      children: node.children,
      parent,
      treeState,
      treeDispatch,
      onChange,
    };
  }, [
    NodeRenderer,
    node,
    active,
    index,
    setActive,
    dragging,
    setDragging,
    level,
    nodeList,
    node.children,
    parent,
    treeState,
    treeDispatch,
    onChange,
  ]);
  return (
    <div className={styles['tree-node']} key={node.key}>
      {treeState.dragged && (
        <div
          className={classNames(styles['tree-node-prev'], { [styles['active']]: activePrev })}
          onDragEnter={(e: React.DragEvent) => handleDragEnter(e, { ...props, node, index }, setActivePrev)}
          onDragLeave={(e: React.DragEvent) => handleDragLeave(e, { ...props, node, index }, setActivePrev)}
          onDragOver={(e: React.DragEvent) => e.preventDefault()}
          onDrop={(e: React.DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
            setActivePrev(false);
            if (!treeState.dragged) return;
            const { node: fromNode, parent: fromParent, index: fromIndex } = treeState.dragged;
            const { move } = moveNodePosition(fromNode, fromParent, fromIndex, node, parent, index);
            if (move) onChange(nodeList);
          }}
        ></div>
      )}
      <TreeNodeContent {...nodeInfo}></TreeNodeContent>
      {!node.folder && Array.isArray(node.children) && (
        <TreeNodeChildren {...nodeInfo} children={node.children} parent={node} level={level + 1}></TreeNodeChildren>
      )}
    </div>
  );
});

export { TreeNode };
