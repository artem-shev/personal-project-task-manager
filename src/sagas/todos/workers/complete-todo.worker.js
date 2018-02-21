import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { normalize } from 'normalizr';

import { todosSchema } from 'schemas';
import { api } from 'helpers';
import { getTodos } from 'selectors';
import { todosActions, uiActions } from 'actions';

export function* completeTodoWorker({ payload: todoIds }) {
  try {
    yield put(uiActions.startTodosFetching());

    const allTodos = yield select(state => getTodos(state));
    let todos = [];

    if (todoIds) {
      todos = allTodos
        .filter(todo => todoIds.includes(todo.id))
        .map((todo) => {
          todo.completed = !todo.completed;
          return todo;
        });
    } else {
      const isAllCompleted = allTodos.every(todo => todo.completed);

      todos = allTodos.map((todo) => {
        todo.completed = !isAllCompleted;
        return todo;
      });
    }

    const response = yield call(
      axios.put,
      api,
      todos,
    );

    const { data: { data: updatedTodos } } = response;
    const normalizeTodos = normalize(updatedTodos, todosSchema);

    yield put(todosActions.completeTodoSuccess(normalizeTodos));
  } catch (err) {
    yield put(todosActions.completeTodoFail(err.response));
  } finally {
    yield put(uiActions.stopTodosFetching());
  }
}
