// Core
import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Control, Form, Errors } from 'react-redux-form';

// Instruments
import Checkbox from 'theme/assets/Checkbox';
import Styles from './styles';

// Components
import Task from '../Task/Task';

export default class Scheduler extends Component {
  static propTypes = {
    todos: array.isRequired,
    addTodo: func.isRequired,
    fetchTodos: func.isRequired,
    deleteTodo: func.isRequired,
    completeTodo: func.isRequired,
    editTodo: func.isRequired,
    toggleFavorite: func.isRequired,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }

  handleSubmit({ message }) {
    const { addTodo } = this.props;
    addTodo(message);
  }

  handleInputChange({ target: { value } }) {
    if (value.length > 46) {
      toastr.error('Maxim available length for todo is 46');
      return;
    }

    this.setState(() => ({
      todoMessage: value,
    }));
  }

  completeAll() {
    const { completeTodo } = this.props;
    completeTodo();
  }

  handleSearchChange(model, searchQuery) {
    const { fetchTodos } = this.props;

    fetchTodos({ searchQuery });
  }

  render() {
    const {
      todos,
      deleteTodo,
      completeTodo,
      toggleFavorite,
      editTodo,
    } = this.props;

    const allCompleted = todos.every(todo => todo.completed);

    const todoList = todos.map(({
      id, message, completed, favorite,
    }) => (
      <Task
        changePriority={toggleFavorite}
        complete={completeTodo}
        completed={completed}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        id={id}
        favorite={favorite}
        key={id}
        message={message}
      />
    ));

    return (
      <section className={Styles.scheduler}>
        <main>
          <header>
            <h1>Awesome React-Redux Todos</h1>
            <Control
              model="forms.todo.searchQuery"
              changeAction={this.handleSearchChange}
              placeholder="Search todo"
            />
          </header>
          <section>
            <Form onSubmit={this.handleSubmit} model="forms.todo">
              <section>
                <Control.text
                  model="forms.todo.message"
                  placeholder="Task description"
                  validateOn="change"
                  validators={{
                    required: val => val && val.trim().length,
                    maxLength: val => !val || (val && val.length < 46),
                  }}
                />
                <Errors
                  className={Styles.error}
                  model="forms.todo.message"
                  messages={{
                    required: 'Can\'t save empty todo',
                    maxLength: 'Max length for todo is 46 chars',
                  }}
                  show={field => field.submitFailed}
                />
              </section>
              <button>Add todo</button>
            </Form>
            <ul>{todoList}</ul>
          </section>
          <footer>
            <Control.checkbox
              model="forms.todo.allCompleted"
              id="forms.todo.allCompleted"
              component={Checkbox}
              controlProps={{
                color1: '#363636',
                color2: '#fff',
                value: allCompleted,
              }}
              changeAction={this.completeAll}
            />
            <code>All tasks are completed</code>
          </footer>
        </main>
      </section>
    );
  }
}
