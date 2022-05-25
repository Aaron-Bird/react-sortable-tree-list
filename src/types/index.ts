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
  dragged?: { node: TreeNodeData; parent: TreeNodeData };
}
interface TreeAction {
  type: 'dragged';
  payload: any;
}

interface TreeNodeInfo {
  NodeRenderer?: NodeRenderer;
  node: TreeNodeData;
  active?: boolean;
  index?: number;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
  dragging?: boolean;
  setDragging?: React.Dispatch<React.SetStateAction<boolean>>;
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

export { TreeNodeData, NodeRenderer, OnChange, TreeNodeInfo, TreeState, TreeAction };
