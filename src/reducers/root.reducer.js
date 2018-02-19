import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import { todos } from './todos/todos.reducer';

export const rootReduer = combineReducers({
  todos,
  toastr,
});
