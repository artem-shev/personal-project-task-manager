import { takeEvery } from 'redux-saga/effects';

import { todosTypes } from 'actions';

import { addTodoWorker } from './workers/add-todo.worker';
import { fetchTodosWorker } from './workers/fetch-todos.worker';
import { deleteTodoWorker } from './workers/delete-todo.worker';

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
};
