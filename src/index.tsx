import React from 'react';
import { TreeNodeData, NodeRenderer, OnChange, NodeRendererProps } from './types';
import { Tree } from './components/Tree';

interface SortableTreeProps {
  nodeList: TreeNodeData[];
  children: NodeRenderer;
  onChange?: OnChange;
  [key: string]: any;
}
export default function SortableTree(props: SortableTreeProps) {
  let { nodeList, children: NodeRenderer, onChange, ...containerProps } = props;

  if (!Array.isArray(nodeList)) throw new Error('nodeList must be an Array');
  if (!nodeList.length) return <div className="sortable-tree" {...containerProps}></div>;
  if (typeof NodeRenderer !== 'function') NodeRenderer = ({ node }) => <div></div>;
  if (!onChange) onChange = () => {};

  return (
    <Tree nodeList={nodeList} NodeRenderer={NodeRenderer} onChange={onChange} containerProps={containerProps}></Tree>
  );
}

export { SortableTree, NodeRendererProps };
