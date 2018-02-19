import { schema } from 'normalizr';

export const todoSchema = new schema.Entity('todo');
export const todosSchema = [todoSchema];
