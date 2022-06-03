import React, { useCallback } from 'react';
import { TreeNodeData, NodeRenderer, OnChange, NodeRendererProps } from './types';
import { Tree } from './components/Tree';
import { TreeNodeLine } from './components/TreeNodeLine';
import { TreeNodeExpand } from './components/TreeNodeExpand';
import { OptionContext } from './contexts/option';

interface SortableTreeProps {
  nodeList: TreeNodeData[];
  children: NodeRenderer;
  onChange?: OnChange;
  [key: string]: any;
}
export default function SortableTree(props: SortableTreeProps) {
  let { nodeList, children: NodeRenderer, onChange, expandAll, ...containerProps } = props;

  if (!Array.isArray(nodeList)) throw new Error('nodeList must be an Array');
  if (!nodeList.length) return <div className="sortable-tree" {...containerProps}></div>;
  if (typeof NodeRenderer !== 'function') useCallback((NodeRenderer = ({ node }) => <div></div>), []);
  if (!onChange) onChange = useCallback(() => {}, []);
  if (typeof expandAll !== 'boolean') expandAll = false;

  return (
    <OptionContext.Provider
      value={{
        expandAll,
      }}
    >
      <Tree nodeList={nodeList} NodeRenderer={NodeRenderer} onChange={onChange} containerProps={containerProps}></Tree>
    </OptionContext.Provider>
  );
}

export { SortableTree, TreeNodeLine, TreeNodeExpand, NodeRendererProps, TreeNodeData };
