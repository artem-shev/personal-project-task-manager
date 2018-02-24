import moment from 'moment';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import { todosSchema } from 'schemas';

const getTodosState = state => state.todos;

export const getTodos = createSelector(
  getTodosState,
  (todosState) => {
    const { entities, result } = todosState.toJS();
    const todos = denormalize(result, todosSchema, entities);

    // const sortedTodos = [
    //   ...todos.filter(todo => todo.favorite && !todo.completed),
    //   ...todos.filter(todo => !todo.favorite && !todo.completed),
    //   ...todos.filter(todo => todo.completed),
    // ];

    const sortedTodos = todos.sort((curr, next) => {
      if (curr.completed !== next.completed) {
        return curr.completed ? 1 : -1;
      }

      if (curr.favorite !== next.favorite) {
        return curr.favorite ? -1 : 1;
      }

      const currDate = moment(curr.modified || curr.created);
      const nextDate = moment(next.modified || next.created);

      return currDate.isBefore(nextDate) ? 1 : -1;
    });

    return sortedTodos;
  },
);
