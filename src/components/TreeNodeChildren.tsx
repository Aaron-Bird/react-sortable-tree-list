import React from 'react';
import type { TreeNodeData, TreeNodeInfo } from '../types';
import { TreeNode } from './TreeNode';

const TreeNodeChildren = React.memo((props: TreeNodeInfo) => {
  const { children } = props;
  return (
    <div>
      {children.map((node: TreeNodeData, index: number) => {
        if (!node.children) node.children = [];
        if (!Array.isArray(node.children)) throw new Error('Children must be an Array');
        return <TreeNode key={(node as any).key} {...props} node={node} index={index}></TreeNode>;
      })}
    </div>
  );
});

export { TreeNodeChildren };
