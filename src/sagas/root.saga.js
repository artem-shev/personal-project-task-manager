import { all } from 'redux-saga/effects';

import { todosSaga } from './todos/todos.saga';

export function* rootSaga() {
  yield all([
    todosSaga.addTodoWatcher(),
    todosSaga.fetchTodosWatcher(),
    todosSaga.deleteTodoWatcher(),
  ]);
}
