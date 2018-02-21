import { combineForms } from 'react-redux-form';

export const forms = combineForms({
  todo: {
    message: '',
    searchQuery: '',
    allCompleted: '',
  },
}, 'forms');
