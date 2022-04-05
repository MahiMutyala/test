import { initialState, ITodosState, todosReducer } from './todos.reducer';
import { ITodo } from './../interfaces';
import * as TodoActions from './todo.actions';

import { clone } from '@app/lib/utils';
import { FILTER_MODES } from '../constants/filter-modes';

describe('Todos Reducer', () => {
  let state: ITodosState;

  beforeEach(() => {
    state = clone(initialState);
    expect(state).toEqual(initialState);
  });

  describe('Add Todo', () => {
    it('Should add a new Todo', () => {
      const text = 'New todo';
      const todo: ITodo = {
        text,
        completed: false,
      };

      const newState = todosReducer(state, TodoActions.addTodo({ text }));
      expect(newState.todos).toEqual([todo]);
    });
  });

  describe('Update Todo', () => {
    it('should update a Todo', () => {
      const text1 = 'Todo 1';
      const text2 = 'Todo Item 1';

      const updatedTodo1: ITodo = {
        text: text2,
        completed: false,
      };

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.updateTodo({index: 0 , text: text2 }));
      expect(newState.todos).toEqual([updatedTodo1]);
    });
  });

  describe('Remove Todo', () => {
    it('should remove a Todo', () => {
      const text1 = 'Todo 1';
      const todo1: ITodo = {
        text: text1,
        completed: false,
      };

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.addTodo({ text: 'Todo 2' }));
      newState = todosReducer(newState, TodoActions.removeTodo({ index: 0 }));
      expect(newState.todos).toEqual([todo1]);
    });
  });

  describe('Change Filter Mode', () => {
    it('should change filter mode', () => {
      const mode: FILTER_MODES = 'Completed';

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.changeFilterMode({ mode }));
      expect(newState.filterMode).toEqual(mode);
    });
  });

  describe('Toggle Completed', () => {
    it('should toggle completed', () => {
      const text1 = 'Todo Item 1';
      const text2 = 'Todo Item 2';

      const todo1: ITodo = {
        text: text1,
        completed: true,
      };

      const todo2: ITodo = {
        text: text2,
        completed: false,
      };

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.addTodo({ text: text2 }));
      newState = todosReducer(newState, TodoActions.toggleCompleted({ index: 1 }));

      expect(newState.todos).toEqual([todo2, todo1]);
    });
  });

  describe('Toggle All Completed', () => {
    it('should toggle all completed', () => {
      const text1 = 'Todo Item 1';
      const text2 = 'Todo Item 2';

      const todo1: ITodo = {
        text: text1,
        completed: true,
      };

      const todo2: ITodo = {
        text: text2,
        completed: true,
      };

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.addTodo({ text: text2 }));
      newState = todosReducer(newState, TodoActions.toggleAllCompleted());

      expect(newState.todos).toEqual([todo2, todo1]);
    });
  });

  describe('Clear Completed', () => {
    it('should clear all completed', () => {
      const text1 = 'Todo Item 1';
      const text2 = 'Todo Item 2';

      const todo1: ITodo = {
        text: text1,
        completed: false,
      };

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.addTodo({ text: text2 }));
      newState = todosReducer(newState, TodoActions.toggleCompleted({ index: 0 }));
      newState = todosReducer(newState, TodoActions.clearCompleted());

      expect(newState.todos).toEqual([todo1]);
    });
  });
});
