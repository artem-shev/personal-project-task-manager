import { call, put } from 'redux-saga/effects';
import { actions as formActions } from 'react-redux-form';
import axios from 'axios';
import { normalize } from 'normalizr';

import { todoSchema } from 'schemas';
import { api } from 'helpers';
import { uiActions, todosActions } from 'actions';


export function* addTodoWorker({ payload: message }) {
  try {
    yield put(uiActions.startTodosFetching());
    const response = yield call(
      axios.post,
      api,
      { message },
    );
    const { data: { data: todo } } = response;

    const normalizedTodo = normalize(todo, todoSchema);

    yield put(todosActions.addTodoSuccess(normalizedTodo));
    yield put(formActions.reset('forms.todo.message'));
  } catch (err) {
    yield put(todosActions.addTodoFail(err));
  } finally {
    yield put(uiActions.stopTodosFetching());
  }
}
