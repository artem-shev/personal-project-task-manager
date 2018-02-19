import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import { todos } from './todos/todos.reducer';
import { ui } from './ui/ui.reducer';

export const rootReduer = combineReducers({
  toastr,

  ui,
  todos,
});
