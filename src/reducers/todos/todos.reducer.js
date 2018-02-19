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

    case types.EDIT_TODO_SUCCESS:
    case types.TOGGLE_FAVORITE_SUCCESS:
    case types.COMPLETE_TODO_SUCCESS: {
      const updatedEntities = payload.result
        .reduce(
          (res, id) => res.setIn(['todo', id], fromJS(payload.entities.todo[id])),
          state.get('entities'),
        );
      return state
        .set('entities', updatedEntities);
    }

    default:
      return state;
  }
}
