import { combineReducers } from 'redux';

import { todos } from './todos/todos.reducer';

export const rootReduer = combineReducers({
  todos,
});
