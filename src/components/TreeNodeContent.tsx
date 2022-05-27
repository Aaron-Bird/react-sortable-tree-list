import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from '../index.less';
import {  TreeNodeContentProps } from '../types';
import { handleDragStart, handleDragEnter, handleDragLeave, handleDrop, handleDragEnd, handleDragOver } from '../event';

const TreeNodeContent = React.memo((props: TreeNodeContentProps) => {
  console.log('+')
  const { NodeRenderer, node, level } = props;
  const [active, setActive] = useState<string>(null);
  const treeNodeRef = useRef();
  return (
    <div
      ref={treeNodeRef}
      className={classNames([
        'sortable-tree-node',
      ])}
      key={node.key}
    >
      <div
        draggable="true"
        className={classNames(styles['tree-node-content'], {
          // [styles['active']]: active,
        })}
        onDragStart={(e: React.DragEvent) => handleDragStart(e, props)}
        onDragEnter={(e: React.DragEvent) => handleDragEnter(e, props, setActive)}
        onDragLeave={(e: React.DragEvent) => handleDragLeave(e, props, setActive)}
        onDragOver={(e: React.DragEvent) => handleDragOver(e, props, treeNodeRef, setActive)}
        onDrop={(e: React.DragEvent) => handleDrop(e, props, setActive)}
        onDragEnd={(e: React.DragEvent) => handleDragEnd(e, props)}
      >
        <div
          className={classNames([
            styles['tree-node-content'],
            {
              [styles['tree-node--active-next']]: active === 'active-next',
              [styles['tree-node--active-prev']]: active === 'active-prev',
              [styles['tree-node--active']]: active === 'active',
            },
          ])}
          style={{ marginLeft: level * 20 + 'px' }}
        >
          {NodeRenderer(props)}
        </div>
      </div>
    </div>
  );
});

export { TreeNodeContent };
