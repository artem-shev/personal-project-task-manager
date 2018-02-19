import { fromJS } from 'immutable';

import { uiTypes as types } from 'actions';

const initialState = fromJS({
  isTodosFetching: false,
});

export function ui(state = initialState, { type }) {
  switch (type) {
    case types.START_TODOS_FETCHING:
      return state.set('isTodosFetching', true);
    case types.STOP_TODOS_FETCHING:
      return state.set('isTodosFetching', false);
    default:
      return state;
  }
}
