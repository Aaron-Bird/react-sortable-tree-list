import React, { ReactNode } from 'react';

type TreeNodeData =
  | {
      key: any;
      children?: TreeNodeData[];
      folder?: boolean;
      [key: string]: any;
    }
  | {
      root: true;
      children: TreeNodeData[];
    };

interface TreeState {
  dragged?: { node: TreeNodeData; parent: TreeNodeData; index: number };
}
interface TreeAction {
  type: 'dragged';
  payload: any;
}

interface TreeNodeChildrenProps {
  treeState: TreeState;
  treeDispatch: React.Dispatch<TreeAction>;
  onChange: OnChange;
  NodeRenderer: NodeRenderer;
  nodeList: TreeNodeData[];
  children: TreeNodeData[];
  parent: TreeNodeData;
  level: number;
}

interface TreeNodeContentProps {
  treeState: TreeState;
  treeDispatch: React.Dispatch<TreeAction>;
  onChange: OnChange;
  NodeRenderer: NodeRenderer;
  nodeList: TreeNodeData[];
  parent: TreeNodeData;
  level: number;
  index: number;
  node: TreeNodeData;
}

interface TreeNodeInfo {
  NodeRenderer?: NodeRenderer;
  node: TreeNodeData;
  index?: number;
  level: number;
  nodeList: TreeNodeData[];
  children: TreeNodeData[];
  parent: TreeNodeData;
  treeState: TreeState;
  treeDispatch: React.Dispatch<TreeAction>;
  onChange: OnChange;
}

type NodeRenderer = ({
  node,
  level,
  nodeList,
}: {
  node: TreeNodeData;
  level: number;
  nodeList: TreeNodeData[];
}) => ReactNode;

type OnChange = (nodeList: TreeNodeData[]) => void;

export {
  TreeNodeData,
  NodeRenderer,
  OnChange,
  TreeNodeInfo,
  TreeState,
  TreeAction,
  TreeNodeChildrenProps,
  TreeNodeContentProps,
};
