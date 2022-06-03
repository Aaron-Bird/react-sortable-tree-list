import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './TreeNodeExpand.less';
import { TreeNodeContentProps, TreeNodeRender } from '../types';
import { handleDragStart, handleDragEnd } from '../utils';
import { canMoveNode, insertBefore, appendChild, insertAfter } from '../utils';

export const TreeNodeExpand = (TreeNodeRender: TreeNodeRender) => {
  return (props: TreeNodeContentProps) => {
    const { level, treeState, node, treeDispatch, index, parent, parentUpdateComponent, updateComponent } = props;
    const [active, setActive] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>();
    return (
      <div ref={ref}>
        {active && (
          <div
            className={styles['tree-node_prev']}
            style={{ marginLeft: level * 20 + 'px' }}
            onDragEnter={(e: React.DragEvent) => {
              e.preventDefault();
              e.stopPropagation();

              setActive(true);
              e.currentTarget.classList.add(styles['active']);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();

              e.currentTarget.classList.remove(styles['active']);
              if (!e.relatedTarget || !ref.current || !ref.current.contains(e.relatedTarget as HTMLInputElement)) {
                setActive(null);
              }
            }}
            onDragOver={(e: React.DragEvent) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e: React.DragEvent) => {
              e.preventDefault();
              e.stopPropagation();

              const dragged = treeState.dragged;
              if (dragged && canMoveNode(dragged.node, node)) {
                insertBefore(dragged, { node, index, parent });
                treeState.dragged.parentUpdateComponent();
                parentUpdateComponent();
              }
              e.currentTarget.classList.remove(styles['active']);
              setActive(false);
              treeDispatch({ type: 'dragged', payload: null });
            }}
          ></div>
        )}
        <div
          draggable="true"
          className={classNames(styles['tree-node_content'], { [styles['active']]: active })}
          style={{ marginLeft: level * 20 + 'px' }}
          onDragStart={(e: React.DragEvent) => handleDragStart(e, props)}
          onDragEnter={(e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            setActive(true);
            e.currentTarget.classList.add(styles['active']);
          }}
          onDragLeave={(e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            e.currentTarget.classList.remove(styles['active']);
            if (!e.relatedTarget || !ref.current || !ref.current.contains(e.relatedTarget as HTMLInputElement)) {
              setActive(null);
            }
          }}
          onDragOver={(e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e: React.DragEvent) => {
            e.stopPropagation();
            e.preventDefault();

            const dragged = treeState.dragged;
            if (dragged && canMoveNode(dragged.node, node)) {
              appendChild(dragged, { node, index, parent });

              node.expanded = true;
              treeState.dragged.parentUpdateComponent();
              updateComponent();
            }

            e.currentTarget.classList.remove(styles['active']);
            setActive(false);
            treeDispatch({ type: 'dragged', payload: null });
          }}
          onDragEnd={(e: React.DragEvent) => handleDragEnd(e, props)}
        >
          {TreeNodeRender(props)}
        </div>
        {active && (
          <div
            className={styles['tree-node_next']}
            style={{ marginLeft: level * 20 + 'px' }}
            onDragEnter={(e: React.DragEvent) => {
              e.preventDefault();
              e.stopPropagation();

              setActive(true);
              e.currentTarget.classList.add(styles['active']);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();

              e.currentTarget.classList.remove(styles['active']);
              if (!e.relatedTarget || !ref.current || !ref.current.contains(e.relatedTarget as HTMLInputElement)) {
                setActive(null);
              }
            }}
            onDragOver={(e: React.DragEvent) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e: React.DragEvent) => {
              e.preventDefault();
              e.stopPropagation();

              const dragged = treeState.dragged;
              if (dragged && canMoveNode(dragged.node, node)) {
                insertAfter(dragged, { node, index, parent });
                treeState.dragged.parentUpdateComponent();
                parentUpdateComponent();
              }
              e.currentTarget.classList.remove(styles['active']);
              setActive(false);
              treeDispatch({ type: 'dragged', payload: null });
            }}
          ></div>
        )}
      </div>
    );
  };
};