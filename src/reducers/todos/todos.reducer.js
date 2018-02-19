import { fromJS } from 'immutable';

import { todosTypes as types } from 'actions';

const initialState = fromJS({
  result: [],
  entities: { todos: {} },
});

export function todos(state = initialState, { type, payload }) {
  switch (type) {
    case types.ADD_TODO_SUCCESS: {
      const newResult = state.get('result').unshift(payload.result);
      const newEntities = state.getIn(['entities', 'todo']).merge(payload.entities.todo);

      return state
        .setIn(['entities', 'todo'], newEntities)
        .set('result', newResult);
    }
    case types.FETCH_TODOS_SUCCESS:
      return state.merge(payload);
    case types.DELETE_TODO_SUCCESS: {
      const newResult = state.get('result').filter(id => id !== payload);
      const newEntities = state.getIn(['entities', 'todo']).delete(payload);

      return state
        .setIn(['entities', 'todo'], newEntities)
        .set('result', newResult);
    }
    default:
      return state;
  }
}
