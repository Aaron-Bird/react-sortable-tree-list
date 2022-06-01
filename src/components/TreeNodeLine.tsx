import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from '../index.less';
import { TreeNodeContentProps, TreeNodeRender } from '../types';
import { handleDragStart, handleDragEnter, handleDragLeave, handleDrop, handleDragEnd, handleDragOver } from '../event';

const TreeNodeLine = (TreeNodeRender: TreeNodeRender) => {
  return (props: TreeNodeContentProps) => {
    const { level } = props;
    const [active, setActive] = useState<string>(null);
    return (
      <div
        draggable="true"
        className={classNames(['sortable-tree-node', styles['sortable-tree-node']])}
        onDragStart={(e: React.DragEvent) => handleDragStart(e, props)}
        onDragEnter={(e: React.DragEvent) => handleDragEnter(e, props, setActive)}
        onDragLeave={(e: React.DragEvent) => handleDragLeave(e, props, setActive)}
        onDragOver={(e: React.DragEvent) => handleDragOver(e, props, setActive)}
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
          {TreeNodeRender(props)}
        </div>
      </div>
    );
  };
};

export { TreeNodeLine };
