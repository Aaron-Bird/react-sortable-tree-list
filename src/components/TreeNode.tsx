import React from 'react';
import { TreeNodeChildren } from './TreeNodeChildren';
import { TreeNodeContent } from './TreeNodeContent';

const TreeNode = (props: any) => {
  const {
    NodeRenderer,
    nodeList,
    treeState,
    treeDispatch,
    onChange,
    level,
    parent,
    node,
    index,
  } = props;
  return (
    <React.Fragment>
      <TreeNodeContent
        NodeRenderer={NodeRenderer}
        node={node}
        index={index}
        level={level}
        nodeList={nodeList}
        parent={parent}
        treeState={treeState}
        treeDispatch={treeDispatch}
        onChange={onChange}
      ></TreeNodeContent>
      {!node.folder && Array.isArray(node.children) && (
        <TreeNodeChildren
          treeState={treeState}
          treeDispatch={treeDispatch}
          onChange={onChange}
          NodeRenderer={NodeRenderer}
          nodeList={nodeList}
          children={node.children}
          parent={node}
          level={level + 1}
        ></TreeNodeChildren>
      )}
    </React.Fragment>
  );
};

export { TreeNode };
