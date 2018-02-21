import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { normalize } from 'normalizr';

import { todosSchema } from 'schemas';
import { api } from 'helpers';
import { getTodos } from 'selectors';
import { todosActions, uiActions } from 'actions';

export function* editTodoWorker({ payload: { id, message } }) {
  try {
    yield put(uiActions.startTodosFetching());

    const allTodos = yield select(state => getTodos(state));
    const todo = allTodos.find(t => t.id === id);

    todo.message = message;

    const response = yield call(
      axios.put,
      api,
      [todo],
    );

    const { data: { data: updatedTodos } } = response;
    const normalizeTodos = normalize(updatedTodos, todosSchema);

    yield put(todosActions.editTodoSuccess(normalizeTodos));
  } catch (err) {
    yield put(todosActions.editTodoFail(err.response));
  } finally {
    yield put(uiActions.stopTodosFetching());
  }
}
