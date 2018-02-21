import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import { todos } from './todos/todos.reducer';
import { ui } from './ui/ui.reducer';
import { forms } from './forms/form.reducer';

export const rootReduer = combineReducers({
  toastr,
  forms,

  ui,
  todos,
});
