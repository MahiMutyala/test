import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FILTER_MODES } from './todos/constants/filter-modes';
import { ITodo } from './todos/interfaces';
import { TodosService } from './todos/services/todos.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  newTodoText: string;
  filterMode: FILTER_MODES;
  activeTodos$: Observable<ITodo[]>;
  todoList$: Observable<ITodo[]>;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    // Default Data
    this.todosService.addTodo("Eat");
    this.todosService.addTodo("Sleep");
    this.todosService.addTodo("Code");
    this.todosService.addTodo("Repeat");


    this.todosService.filterMode$.subscribe(filterMode => {
      this.filterMode = filterMode;

      this.todoList$ = this.todosService.allTodos$.pipe(
        map((todos) => {
          switch (filterMode) {
            case 'Active':
              return todos.filter(ele => !ele.completed);

            case 'Completed':
              return todos.filter(ele => ele.completed);

            default:
              return todos;
          }
        }
        ))
    });

    this.activeTodos$ = this.todosService.allTodos$.pipe(map(allTodos => allTodos.filter(ele => !ele.completed)));
  }

  addTodo() {
    if (this.newTodoText) {
      this.todosService.addTodo(this.newTodoText);
    }
    this.newTodoText = null
  }

  changeFilterMode(mode: FILTER_MODES) {
    this.todosService.changeFilterMode(mode);
  }

  clearCompleted() {
    this.todosService.clearCompleted();
  }
}
