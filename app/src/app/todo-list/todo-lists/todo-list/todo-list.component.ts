import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { TodoList } from '../todo-list';
import { TodoItem } from '../../todoItems/todoItem';
import { TodoListStore } from '../../store/todo-list.store';
import {
  LoadTodoList,
  AddTodoItem,
  UpdateTodoItem,
  RemoveTodoItem,
  ClearCurrentTodoList
} from '../../store/events/todo-list.events';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todoList$: Observable<TodoList>;
  todoItemText: string;
  todoListId: string;
  creatingNewItem = true;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.todoList$ = this.store
      .select(state => state)
      .pipe(map(state => state.todo.currentTodoList));

    this.route.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      const todoListId = params.get('id');

      if (todoListId) {
        this.todoListId = todoListId;
        this.store.dispatch(new LoadTodoList({ todoListId: this.todoListId }));
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearCurrentTodoList());
  }

  onTodoItemAdded(formObject) {
    const { todoItemText } = formObject.form.value;
    if (todoItemText) {
      const todoItem = new TodoItem(todoItemText);

      this.store
        .dispatch(new AddTodoItem({ todoItem, todoListId: this.todoListId }))
        .pipe(take(1))
        .subscribe(() => formObject.reset(), console.error);
    }
  }

  todoItemUpdated(todoItem: TodoItem) {
    this.store.dispatch(new UpdateTodoItem({ todoItem, todoListId: this.todoListId }));
  }

  removeTodoItem(todoItem: TodoItem) {
    this.store.dispatch(new RemoveTodoItem({ todoItem, todoListId: this.todoListId }));
  }

  trackByTodoItems(_: number, todoItem: TodoItem) {
    return todoItem.id;
  }
}
