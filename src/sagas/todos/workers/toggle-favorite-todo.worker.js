import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { normalize } from 'normalizr';

import { todosSchema } from 'schemas';
import { api } from 'helpers';
import { getTodos } from 'selectors';
import { todosActions, uiActions } from 'actions';

export function* toggleFavoriteTodoWorker({ payload: todoId }) {
  try {
    yield put(uiActions.startTodosFetching());

    const allTodos = yield select(state => getTodos(state));
    const todo = allTodos.find(t => t.id === todoId);

    todo.favorite = !todo.favorite;
    const response = yield call(
      axios.put,
      api,
      [todo],
    );

    const { data: { data: updatedTodos } } = response;
    const normalizeTodos = normalize(updatedTodos, todosSchema);

    yield put(todosActions.toggleFavoriteSuccess(normalizeTodos));
  } catch (err) {
    yield put(todosActions.toggleFavoriteFail(err.response));
  } finally {
    yield put(uiActions.stopTodosFetching());
  }
}
