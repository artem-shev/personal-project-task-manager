import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { object, array } from 'prop-types';

import { todosActions } from 'actions';
import { getTodos } from 'selectors';
import Scheduler from 'components/Scheduler/Scheduler';

function App(props) {
  const {
    todos,
    actions: { addTodo, fetchTodos, deleteTodo },
  } = props;
  return (
    <Scheduler
      todos={todos}
      addTodo={addTodo}
      fetchTodos={fetchTodos}
      deleteTodo={deleteTodo}
    />
  );
}

App.propTypes = {
  todos: array.isRequired,
  actions: object.isRequired,
};

const mapStateToProps = state => ({
  todos: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(todosActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
