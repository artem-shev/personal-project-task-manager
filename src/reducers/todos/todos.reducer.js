import { Map } from 'immutable';

const initialState = Map({});

export function todos(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
