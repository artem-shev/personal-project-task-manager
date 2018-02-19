import { takeEvery } from 'redux-saga/effects';

import { todosTypes } from 'actions';

import { addTodoWorker } from './workers/add-todo.worker';
import { fetchTodosWorker } from './workers/fetch-todos.worker';
import { deleteTodoWorker } from './workers/delete-todo.worker';
import { completeTodoWorker } from './workers/complete-todo.worker';
import { toggleFavoriteTodoWorker } from './workers/toggle-favorite-todo.worker';
import { editTodoWorker } from './workers/edit-todo.worker';

export const todosSaga = {
  * addTodoWatcher() {
    yield takeEvery(todosTypes.ADD_TODO, addTodoWorker);
  },
  * fetchTodosWatcher() {
    yield takeEvery(todosTypes.FETCH_TODOS, fetchTodosWorker);
  },
  * deleteTodoWatcher() {
    yield takeEvery(todosTypes.DELETE_TODO, deleteTodoWorker);
  },
  * completeTodoWatcher() {
    yield takeEvery(todosTypes.COMPLETE_TODO, completeTodoWorker);
  },
  * toggleFavoriteTodoWatcher() {
    yield takeEvery(todosTypes.TOGGLE_FAVORITE, toggleFavoriteTodoWorker);
  },
  * editTodoWatcher() {
    yield takeEvery(todosTypes.EDIT_TODO, editTodoWorker);
  },
};
