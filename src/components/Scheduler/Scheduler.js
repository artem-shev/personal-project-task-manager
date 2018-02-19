// Core
import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { toastr } from 'react-redux-toastr';

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
  };
  
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  state = {
    todoMessage: '',
    searchQuery: '',
  };

  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addTodo } = this.props;
    const { todoMessage } = this.state;
    
    if (!todoMessage.length) {
      toastr.error('You can\'t create an empty todo');
      return;
    }
    
    addTodo(todoMessage);
    this.setState({ todoMessage: '' });
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
  
  handleSearchChange({ target: { value: searchQuery } }) {
    const { fetchTodos } = this.props;
    this.setState({ searchQuery });
    
    fetchTodos({ searchQuery });
  }
  
  render() {
    const {
      todoMessage,
      searchQuery
    } = this.state;
    const {
      todos,
      deleteTodo,
      completeTodo,
      toggleFavorite,
      editTodo,
    } = this.props;

    const allCompleted = todos.every(todo => todo.completed);
    
    const sortedTodos = [
      ...todos.filter(todo => todo.favorite && !todo.completed),
      ...todos.filter(todo => !todo.favorite && !todo.completed),
      ...todos.filter(todo => todo.completed),
    ];
    
    const todoList = sortedTodos.map(({
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
            <h1>Планировщик задач</h1>
            <input placeholder="Поиск" type="search" onChange={this.handleSearchChange} value={searchQuery} />
          </header>
          <section>
            <form onSubmit={this.handleSubmit}>
              <input
                placeholder="Task description"
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
            <code>All tasks are completed</code>
          </footer>
        </main>
      </section>
    );
  }
}
