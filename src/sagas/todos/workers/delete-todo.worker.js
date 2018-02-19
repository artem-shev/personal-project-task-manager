import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import { api } from 'helpers';
import { uiActions, todosActions } from 'actions';

export function* deleteTodoWorker({ payload: todoId }) {
  try {
    yield put(uiActions.startTodosFetching());

    yield call(
      axios.delete,
      `${api}/${todoId}`,
    );
    yield put(todosActions.deleteTodoSuccess(todoId));
  } catch (e) {
    yield put(todosActions.deleteTodoFail(e.response));
  } finally {
    yield put(uiActions.stopTodosFetching());
  }
}
