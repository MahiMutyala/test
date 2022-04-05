import { Component, Input, OnInit } from '@angular/core';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { ITodo } from '@app/todos/interfaces';
import { TodosService } from '@app/todos/services/todos.service';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnInit {
  @Input() todoList: ITodo[];
  @Input() filterMode: FILTER_MODES;
  editIndex: number;
  editText: string;

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
  }

  updateTodo(index: number) {
    if (this.editText) {
      this.todosService.updateTodo(index, this.editText);
    }
    this.onFocusOutEvent();
  }

  toggleComplete(index: number) {
    this.todosService.toggleComplete(index);
  }

  removeTodo(index: number) {
    this.todosService.removeTodo(index);
  }

  onDblClick(index: number) {
    this.editText = this.todoList[index].text;
    this.editIndex = index;
  }

  onFocusOutEvent() {
    this.editIndex = null;
    this.editText = null;
  }

}
