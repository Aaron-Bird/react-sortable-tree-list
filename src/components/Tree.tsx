import React, { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import { TreeNodeData, NodeRenderer, OnChange, TreeState, TreeAction } from '../types';
import { createRootNode } from '../utils';
import { TreeNodeChildren } from './TreeNodeChildren';
import classNames from 'classnames';
import styles from '../index.less';

const Tree = (props: {
  nodeList: TreeNodeData[];
  NodeRenderer: NodeRenderer;
  onChange: OnChange;
  containerProps: { [key: string]: any };
}) => {
  const { nodeList, NodeRenderer, onChange, containerProps } = props;
  const rootNode = useMemo(() => createRootNode(nodeList), [nodeList]);

  const [dragging, setDragging] = useState(false);
  const [treeState, treeDispatch] = useReducer(
    (state: TreeState, action: TreeAction) => {
      switch (action.type) {
        case 'dragged':
          if (action.payload) {
            state.dragged = action.payload;
            setDragging(true);
          } else {
            state.dragged = null;
            setDragging(false);
          }
          return state;
        default:
          throw new Error('Unknown dispatch type: ' + action.type);
      }
    },
    { dragged: null }
  );
  const [update, setUpdate] = useState({});
  const updateComponent = useCallback(() => setUpdate({}), []);
  return (
    <div className={classNames([styles['sortable-tree'], { [styles['dragging']]: dragging }])} {...containerProps}>
      <TreeNodeChildren
        children={rootNode.children}
        NodeRenderer={NodeRenderer}
        level={0}
        nodeList={nodeList}
        treeDispatch={treeDispatch}
        parent={rootNode}
        onChange={onChange}
        treeState={treeState}
        parentUpdate={update}
        parentUpdateComponent={updateComponent}
      ></TreeNodeChildren>
    </div>
  );
};

export { Tree };
