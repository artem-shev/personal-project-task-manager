// Core
import React, { Component } from 'react';
import { func, array } from 'prop-types';

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
  };
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state = {
    todoMessage: '',
  };

  // complete = id =>
  //   this.setState(({ todos }) => ({
  //     todos: todos.map((todo) => {
  //       if (todo.id === id) {
  //         todo.completed = !todo.completed;
  //       }
  //
  //       return todo;
  //     }),
  //   }));

  // changePriority = id =>
  //   this.setState(({ todos }) => ({
  //     todos: todos.map((todo) => {
  //       if (todo.id === id) {
  //         todo.important = !todo.important;
  //       }
  //
  //       return todo;
  //     }),
  //   }));

  // completeAll = () =>
  //   this.setState(({ todos }) => ({
  //     todos: todos.map((todo) => {
  //       todo.completed = true;
  //
  //       return todo;
  //     }),
  //   }));

  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addTodo } = this.props;
    const { todoMessage } = this.state;
    addTodo(todoMessage);
  }

  handleInputChange({ target: { value } }) {
    this.setState(() => ({
      todoMessage: value,
    }));
  }

  render() {
    const { todoMessage } = this.state;
    const {
      todos,
      deleteTodo,
    } = this.props;

    const allCompleted = todos.every(todo => todo.completed);
    const todoList = todos.map(({
      id, message, completed, favorite,
    }) => (
      <Task
        changePriority={this.changePriority}
        complete={this.complete}
        completed={completed}
        deleteTodo={deleteTodo}
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
            <h1>Планировщик задач</h1>
            <input placeholder="Поиск" type="search" />
          </header>
          <section>
            <form onSubmit={this.handleSubmit}>
              <input
                placeholder="Описание моей новой задачи"
                type="text"
                onChange={this.handleInputChange}
                value={todoMessage}
              />
              <button>Добавить задачу</button>
            </form>
            <ul>{todoList}</ul>
          </section>
          <footer>
            <Checkbox
              checked={allCompleted}
              color1="#363636"
              color2="#fff"
              onClick={this.completeAll}
            />
            <code>Все задачи выполнены</code>
          </footer>
        </main>
      </section>
    );
  }
}
