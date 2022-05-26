import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from '../index.less';
import { TreeNodeInfo, TreeNodeContentProps } from '../types';
import { handleDragStart, handleDragEnter, handleDragLeave, handleDrop, handleDragEnd, handleDragOver } from '../event';
import { moveNodePosition } from '../utils';

const TreeNodeContent = React.memo((props: TreeNodeContentProps) => {
  const { NodeRenderer, node, onChange } = props;
  const [active, setActive] = useState<string>(null);
  const treeNodeRef = useRef();
  return (
    <div
      ref={treeNodeRef}
      className={classNames([
        styles['tree-node'],
        {
          [styles['tree-node--active-next']]: active === 'active-next',
          [styles['tree-node--active-prev']]: active === 'active-prev',
          [styles['tree-node--active']]: active === 'active',
        },
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
        {NodeRenderer(props)}
      </div>
    </div>
  );
});

export { TreeNodeContent };
