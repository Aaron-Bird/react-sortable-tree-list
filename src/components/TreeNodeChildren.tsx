import React from 'react';
import type { TreeNodeData, TreeNodeChildrenProps } from '../types';
import { TreeNode } from './TreeNode';

const TreeNodeChildren = (props: TreeNodeChildrenProps) => {
  const { children } = props;
  return (
    <React.Fragment>
      {children.map((node: TreeNodeData, index: number) => {
        if (!node.children) node.children = [];
        if (!Array.isArray(node.children)) throw new Error('Children must be an Array');
        return <TreeNode key={(node as any).key} {...props} node={node} index={index}></TreeNode>;
      })}
    </React.Fragment>
  );
};

export { TreeNodeChildren };
