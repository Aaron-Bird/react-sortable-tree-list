import React, { useState } from 'react';
import type { TreeNodeData, TreeNodeChildrenProps } from '../types';
import { TreeNode } from './TreeNode';

const TreeNodeChildren = (props: TreeNodeChildrenProps) => {
  const { children, parent, NodeRenderer, level, nodeList, treeDispatch, onChange, treeState, parentSetUpdate } = props;
  return (
    <React.Fragment>
      {children.map((node: TreeNodeData, index: number) => {
        if (!node.children) node.children = [];
        if (!Array.isArray(node.children)) throw new Error('Children must be an Array');
        return (
          <TreeNode
            key={(node as any).key}
            node={node}
            index={index}
            NodeRenderer={NodeRenderer}
            level={level}
            nodeList={nodeList}
            treeDispatch={treeDispatch}
            parent={parent}
            onChange={onChange}
            treeState={treeState}
            parentSetUpdate={parentSetUpdate}
          ></TreeNode>
        );
      })}
    </React.Fragment>
  );
};

export { TreeNodeChildren };
