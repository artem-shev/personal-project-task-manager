import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { todosSchema } from 'schemas';
import { api } from 'helpers';
import { todosActions, uiActions } from 'actions';

export function* fetchTodosWorker() {
  try {
    yield put(uiActions.startTodosFetching());
    const response = yield call(
      axios.get,
      api,
    );

    const { data: { data: todos } } = response;
    const normalizedTodos = normalize(todos, todosSchema);
    yield put(todosActions.fetchTodosSuccess(normalizedTodos));
  } catch (err) {
    const msg = err.response.data.message;
    toastr.error(`Can't fetch todos: ${msg}`);

    yield put(todosActions.fetchTodosFail(err.response));
  } finally {
    yield put(uiActions.stopTodosFetching());
  }
}
