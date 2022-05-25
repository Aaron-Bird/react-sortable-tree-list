import React from 'react';
import classNames from 'classnames';
import styles from '../index.less';
import { TreeNodeInfo } from '../types';
import { handleDragStart, handleDragEnter, handleDragLeave, handleDrop, handleDragEnd } from '../event';

const TreeNodeContent = React.memo((props: TreeNodeInfo) => {
  console.log('TreeNodeContent');
  const { NodeRenderer, active, dragging, setActive } = props;
  return (
    <div
      draggable="true"
      className={classNames(styles['tree-node-content'], {
        [styles['active']]: active,
        [styles['dragging']]: dragging,
      })}
      onDragStart={(e: React.DragEvent) => handleDragStart(e, props)}
      onDragEnter={(e: React.DragEvent) => handleDragEnter(e, props, setActive)}
      onDragLeave={(e: React.DragEvent) => handleDragLeave(e, props, setActive)}
      onDragOver={(e: React.DragEvent) => e.preventDefault()}
      onDrop={(e: React.DragEvent) => handleDrop(e, props, setActive)}
      onDragEnd={(e: React.DragEvent) => handleDragEnd(e, props)}
    >
      {NodeRenderer(props)}
    </div>
  );
});

export { TreeNodeContent };
