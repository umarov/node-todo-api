import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { take } from 'rxjs/operators/take';
import { Observable } from 'rxjs/Observable';
import { Ngxs, Select } from 'ngxs';

import { TodoList } from '../todo-list';
import { TodoItem } from '../../todoItems/todoItem';
import { TodoItemsService } from '../../todoItems/todoItems.service';
import { TodoStoreState } from '../../store/todo-list.store';
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
  @Select('todoList.currentTodoList') todoList$: Observable<TodoList>;
  todoItemText: string;
  todoListId: string;
  creatingNewItem = true;

  constructor(
    private route: ActivatedRoute,
    private ngxs: Ngxs,
    private todoItemsService: TodoItemsService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      const todoListId = params.get('id');

      if (todoListId) {
        this.todoListId = todoListId;
        this.ngxs.dispatch(new LoadTodoList({ todoListId: this.todoListId }));
      }
    });
  }

  ngOnDestroy() {
    this.ngxs.dispatch(new ClearCurrentTodoList());
  }

  onTodoItemAdded(formObject) {
    const { todoItemText } = formObject.form.value;
    if (todoItemText) {
      const todoItem = new TodoItem(todoItemText);

      this.ngxs
        .dispatch(new AddTodoItem({ todoItem, todoListId: this.todoListId }))
        .pipe(take(1))
        .subscribe(_ => {
          formObject.reset();
        }, console.error);
    }
  }

  todoItemUpdated(todoItem: TodoItem) {
    this.ngxs.dispatch(new UpdateTodoItem({ todoItem, todoListId: this.todoListId }));
  }

  removeTodoItem(todoItem: TodoItem) {
    this.ngxs.dispatch(new RemoveTodoItem({ todoItem, todoListId: this.todoListId }));
  }

  trackByTodoItems(_: number, todoItem: TodoItem) {
    return todoItem.id;
  }
}
