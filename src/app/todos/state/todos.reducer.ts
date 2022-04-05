import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [{ text, completed: false }, ...existingState.todos],
    })),

    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos[index] = { ...updatedTodos[index], text };

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),

    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),

    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),

    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),

    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),

    on(TodoActions.toggleAllCompleted, (existingState) => {
      const completedTodos = [...existingState.todos.filter(ele => ele.completed)];
      if (existingState.todos.length !== completedTodos.length) {
        return {
          ...existingState,
          todos: existingState.todos.map(ele => ({ ...ele, completed: true })),
        };
      }

      return {
        ...existingState,
        todos: existingState.todos.map(ele => ({ ...ele, completed: false })),
      };

    }),
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
