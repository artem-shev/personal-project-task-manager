import { todosTypes as types } from './todos.types';

export const todosActions = Object.freeze({
  fetchTodos: () => ({ type: types.FETCH_TODOS }),
  fetchTodosSuccess: todos => ({ type: types.FETCH_TODOS_SUCCESS, payload: todos }),
  fetchTodosFail: err => ({ type: types.FETCH_TODOS_FAIL, payload: err, error: true }),

  addTodo: message => ({ type: types.ADD_TODO, payload: message }),
  addTodoSuccess: todo => ({ type: types.ADD_TODO_SUCCESS, payload: todo }),
  addTodoFail: err => ({ type: types.ADD_TODO_FAIL, payload: err, error: true }),

  deleteTodo: id => ({ type: types.DELETE_TODO, payload: id }),
  deleteTodoSuccess: id => ({ type: types.DELETE_TODO_SUCCESS, payload: id }),
  deleteTodoFail: err => ({ type: types.DELETE_TODO_FAIL, payload: err, error: true }),
});
