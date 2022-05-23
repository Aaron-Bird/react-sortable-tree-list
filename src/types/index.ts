import { ReactNode } from 'react';

interface Tree {
  root: true;
  children: TreeNode[];
}

interface TreeNode {
  children?: TreeNode[];
  [key: string]: any;
  folder?: boolean;
}

type NodeRenderer = ({ node, level, nodeList }: { node: TreeNode; level: number; nodeList: TreeNode[] }) => ReactNode;

type OnChange = (nodeList: TreeNode[]) => void;

export { Tree, TreeNode, NodeRenderer, OnChange };
