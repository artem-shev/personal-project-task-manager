import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import { todosSchema } from 'schemas';

const getTodosState = state => state.todos;

export const getTodos = createSelector(
  getTodosState,
  (todosState) => {
    const { entities, result } = todosState.toJS();
    return denormalize(result, todosSchema, entities);
  },
);
