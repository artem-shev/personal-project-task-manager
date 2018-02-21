import { todosTypes as types } from './todos.types';

export const todosActions = Object.freeze({
  fetchTodos: params => ({ type: types.FETCH_TODOS, payload: params }),
  fetchTodosSuccess: todos => ({ type: types.FETCH_TODOS_SUCCESS, payload: todos }),
  fetchTodosFail: err => ({ type: types.FETCH_TODOS_FAIL, payload: err, error: true }),

  addTodo: message => ({ type: types.ADD_TODO, payload: message }),
  addTodoSuccess: todo => ({ type: types.ADD_TODO_SUCCESS, payload: todo }),
  addTodoFail: err => ({ type: types.ADD_TODO_FAIL, payload: err, error: true }),

  deleteTodo: id => ({ type: types.DELETE_TODO, payload: id }),
  deleteTodoSuccess: id => ({ type: types.DELETE_TODO_SUCCESS, payload: id }),
  deleteTodoFail: err => ({ type: types.DELETE_TODO_FAIL, payload: err, error: true }),

  completeTodo: ids => ({ type: types.COMPLETE_TODO, payload: ids }),
  completeTodoSuccess: todos => ({ type: types.COMPLETE_TODO_SUCCESS, payload: todos }),
  completeTodoFail: err => ({ type: types.COMPLETE_TODO_FAIL, payload: err, error: true }),

  toggleFavorite: id => ({ type: types.TOGGLE_FAVORITE, payload: id }),
  toggleFavoriteSuccess: todo => ({ type: types.TOGGLE_FAVORITE_SUCCESS, payload: todo }),
  toggleFavoriteFail: err => ({ type: types.TOGGLE_FAVORITE_FAIL, payload: err, error: true }),

  editTodo: todo => ({ type: types.EDIT_TODO, payload: todo }),
  editTodoSuccess: todos => ({ type: types.EDIT_TODO_SUCCESS, payload: todos }),
  editTodoFail: err => ({ type: types.EDIT_TODO_FAIL, payload: err, error: true }),
});
