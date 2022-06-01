import React, { ReactNode } from 'react';

interface TreeData {
  root: true;
  children: TreeNodeData[];
}

interface TreeNodeData {
  key: any;
  children?: TreeNodeData[];
  expanded?: boolean;
  [key: string]: any;
}

interface TreeState {
  dragged?: {
    index: number;
    node: TreeNodeData;
    parent: TreeData | TreeNodeData;
    updateComponent: () => void;
    parentUpdateComponent: () => void;
  };
}
interface TreeAction {
  type: 'dragged';
  payload: null | {
    index: number;
    node: TreeNodeData;
    parent: TreeData | TreeNodeData;
    updateComponent: () => void;
    parentUpdateComponent: () => void;
  };
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

interface TreeNodeRenderProps {
  treeState: TreeState;
  treeDispatch: React.Dispatch<TreeAction>;
  onChange: OnChange;
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

type TreeNodeWrapperRender = () => () => ReactNode;

type TreeNodeRender = (props: TreeNodeRenderProps) => ReactNode;

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
  TreeNodeWrapperRender,
  TreeNodeRender,
};
