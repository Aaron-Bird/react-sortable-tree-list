import React, {useState} from 'react';
import type { TreeNodeData, TreeNodeChildrenProps } from '../types';
import { TreeNode } from './TreeNode';

const TreeNodeChildren = (props: TreeNodeChildrenProps) => {
  const { children } = props;
  const [parentUpdate, parentSetUpdate] = useState({});
  return (
    <React.Fragment>
      {children.map((node: TreeNodeData, index: number) => {
        if (!node.children) node.children = [];
        if (!Array.isArray(node.children)) throw new Error('Children must be an Array');
        return (
          <TreeNode
            key={(node as any).key}
            {...props}
            node={node}
            index={index}
            parentUpdate={parentUpdate}
            parentSetUpdate={parentSetUpdate}
          ></TreeNode>
        );
      })}
    </React.Fragment>
  );
};

export { TreeNodeChildren };
