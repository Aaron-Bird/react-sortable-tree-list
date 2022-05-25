import React, { useMemo, useReducer } from 'react';
import { TreeNodeData, NodeRenderer, OnChange, TreeState, TreeAction } from '../types';
import { createRootNode } from '../utils';
import { TreeNodeChildren } from './TreeNodeChildren';

const Tree = (props: {
  nodeList: TreeNodeData[];
  NodeRenderer: NodeRenderer;
  onChange: OnChange;
  containerProps: { [key: string]: any };
}) => {
  const { nodeList, NodeRenderer, onChange, containerProps } = props;
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
    { dragged: null }
  );
  const nodeInfo = useMemo(() => {
    return {
      children: rootNode.children,
      NodeRenderer,
      level: 0,
      nodeList,
      treeState,
      treeDispatch,
      parent: rootNode,
      onChange,
      node: rootNode,
    };
  }, [rootNode.children, NodeRenderer, nodeList, treeState, treeDispatch, rootNode, onChange]);
  return (
    <div className="sortable-tree" {...containerProps}>
      <TreeNodeChildren {...nodeInfo}></TreeNodeChildren>
    </div>
  );
};

export { Tree };
