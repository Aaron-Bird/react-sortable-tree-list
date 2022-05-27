import React, { useState } from 'react';
import { TreeNodeChildren } from './TreeNodeChildren';
import { TreeNodeContent } from './TreeNodeContent';
import {TreeNodeProps} from '../types';

const TreeNode = React.memo((props: TreeNodeProps) => {
  const {parentUpdate, parentSetUpdate} = props;
  const [update, setUpdate] = useState({});
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
        update={update}
        setUpdate={setUpdate}
        parentUpdate={parentUpdate}
        parentSetUpdate={parentSetUpdate}
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
});

export { TreeNode };
