import React, { useReducer } from 'react';
import {TreeState, TreeAction} from '../types';

export const useTreeState = () => {
  return useReducer(
    (state: TreeState, action: TreeAction) => {
      switch (action.type) {
        case 'dragged':
          return { dragged: action.payload };
        default:
          throw new Error('Unknown dispatch type: ' + action.type);
      }
    },
    { dragged: null }
  );
};
