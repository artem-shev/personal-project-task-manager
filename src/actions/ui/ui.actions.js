import { uiTypes as types } from './ui.types';

export const uiActions = Object.freeze({
  startTodosFetching: () => ({ type: types.START_TODOS_FETCHING }),
  stopTodosFetching: () => ({ type: types.STOP_TODOS_FETCHING }),
});
