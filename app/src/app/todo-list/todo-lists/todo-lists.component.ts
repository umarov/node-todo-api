import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';

import { TodoList } from './todo-list';
import { DeleteTodoList, LoadTodoLists } from '../store/events/todo-list.events';
import { TodoListStore } from '../store/todo-list.store';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class TodoListsComponent implements OnInit {
  todoLists$: Observable<TodoList[]>;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.todoLists$ = this.store.select(state => state).pipe(map(state => state.todo.todoLists));
    this.getTodoLists();

    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  private updateOnlineStatus(event) {
    if (navigator.onLine) {
      this.getTodoLists();
      this.snackBar.open('You are back online', 'Dismiss', {
        duration: 5000
      });
    } else {
      this.snackBar.open('You are offline currently', 'Dismiss', {
        duration: 5000
      });
    }
  }

  private getTodoLists() {
    this.store.dispatch(new LoadTodoLists());
  }

  createTodoList() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  showTodoList(todoListId: string) {
    this.router.navigate(['todo-lists', todoListId]);
  }

  delete(todoList: TodoList) {
    this.store.dispatch(new DeleteTodoList({ todoListId: todoList.id }));
  }

  trackTodoLists(_: number, todoList: TodoList) {
    return todoList.id;
  }
}
