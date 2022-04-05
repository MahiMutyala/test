import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as todosState from './todos.reducer';

export const todosSelector = createFeatureSelector<todosState.ITodosState>('todos');

export const allTodos = createSelector(
  todosSelector,
  todosState.todos,
);

export const filterModeSelector = createFeatureSelector<todosState.ITodosState>('todos');

export const filMode = createSelector(
  filterModeSelector,
  todosState.filterMode,
);
