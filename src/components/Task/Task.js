// Core
import React, { Component } from 'react';
import cx from 'classnames';
import { string, bool, func } from 'prop-types';
import { toastr } from 'react-redux-toastr';

// Instruments
import Checkbox from 'theme/assets/Checkbox';
import Delete from 'theme/assets/Delete';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';
import Styles from './styles';

export default class Task extends Component {
  static propTypes = {
    id: string.isRequired,
    favorite: bool.isRequired,
    completed: bool.isRequired,
    message: string.isRequired,
    editTodo: func.isRequired,
    deleteTodo: func.isRequired,
    changePriority: func.isRequired,
    complete: func.isRequired,
  };

  constructor() {
    super();

    this.complete = this.complete.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.changePriority = this.changePriority.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyPress = this.onInputKeyPress.bind(this);
  }

  state = {
    isEditing: false,
    editedMessage: '',
  }

  onInputChange({ target: { value: editedMessage } }) {
    if (editedMessage.length > 46) {
      toastr.error('Maxim available length of todo 46');
      return;
    }
    this.setState({ editedMessage });
  }

  onInputKeyPress({ charCode }) {
    if (charCode === 13) {
      this.updateTodo();
    }
  }

  complete() {
    if (this.state.isEditing) { return; }

    const { id, complete } = this.props;

    complete([id]);
  }

  changePriority() {
    const { id, changePriority } = this.props;

    changePriority(id);
  }

  toggleEditMode() {
    if (this.props.completed) { return; }

    const isEditing = !this.state.isEditing;

    this.setState({ isEditing, editedMessage: this.props.message });
    if (!isEditing) {
      this.updateTodo();
    }
  }

  updateTodo() {
    const { editTodo, id, message } = this.props;
    const { editedMessage } = this.state;

    if (!editedMessage.length || editedMessage === message) { return; }

    editTodo({ id, message: editedMessage });
    this.setState({ isEditing: false });
  }

  render() {
    const {
      completed,
      favorite,
      message,
      deleteTodo,
      id,
    } = this.props;

    const { isEditing, editedMessage } = this.state;
    const body = isEditing ?
      (
        <input
          value={editedMessage}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
        />
      ) :
      (
        <code>{message}</code>
      );

    const styles = cx(Styles.task, {
      [Styles.completed]: completed,
    });

    return (
      <li className={styles}>
        <div>
          <Checkbox
            checked={completed}
            color1="#3B8EF3"
            color2="#FFF"
            onClick={this.complete}
          />
          {body}
        </div>
        <div>
          <Star
            checked={favorite}
            color1="#3B8EF3"
            color2="#000"
            onClick={this.changePriority}
          />
          <Edit color1="#3B8EF3" color2="#000" onClick={this.toggleEditMode} />
          <Delete color1="#3B8EF3" color2="#000" onClick={() => deleteTodo(id)} />
        </div>
      </li>
    );
  }
}
