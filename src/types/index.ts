import React, { ReactNode } from 'react';

interface TreeData {
  root: true;
  children: TreeNodeData[];
}

interface TreeNodeData {
  key: any;
  children?: TreeNodeData[];
  folder?: boolean;
  [key: string]: any;
}

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
  parent: TreeData | TreeNodeData;
  level: number;
  parentUpdate: object;
  parentUpdateComponent: () => void;
}

interface TreeNodeProps {
  treeState: TreeState;
  treeDispatch: React.Dispatch<TreeAction>;
  onChange: OnChange;
  NodeRenderer: NodeRenderer;
  nodeList: TreeNodeData[];
  parent: TreeData | TreeNodeData;
  level: number;
  index: number;
  node: TreeNodeData;
  parentUpdateComponent: () => void;
}

interface TreeNodeContentProps {
  treeState: TreeState;
  treeDispatch: React.Dispatch<TreeAction>;
  onChange: OnChange;
  NodeRenderer: NodeRenderer;
  nodeList: TreeNodeData[];
  parent: TreeData | TreeNodeData;
  level: number;
  index: number;
  node: TreeNodeData;
  update: any;
  parentUpdateComponent: () => void;
  updateComponent: () => void;
}

interface NodeRendererProps extends TreeNodeContentProps {}

type NodeRenderer = (props: NodeRendererProps) => ReactNode;

type OnChange = (nodeList: TreeNodeData[]) => void;

export {
  TreeData,
  TreeNodeData,
  NodeRenderer,
  NodeRendererProps,
  OnChange,
  TreeState,
  TreeAction,
  TreeNodeChildrenProps,
  TreeNodeContentProps,
  TreeNodeProps,
};
