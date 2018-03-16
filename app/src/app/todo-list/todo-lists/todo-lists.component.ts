import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Ngxs } from 'ngxs';

import { TodoList } from './todo-list';
import { DeleteTodoList, LoadTodoLists } from '../store/events/todo-list.events';
import { TodoStoreState } from '../store/todo-list.store';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class TodoListsComponent implements OnInit {
  todoLists$: Observable<TodoList[]>;

  constructor(private router: Router, private route: ActivatedRoute, private ngxs: Ngxs) {}

  ngOnInit() {
    this.ngxs.dispatch(new LoadTodoLists());

    this.todoLists$ = this.ngxs.select((state: TodoStoreState) => state.todoLists) as Observable<
      TodoList[]
    >;
  }

  createTodoList() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  showTodoList(todoListId: string) {
    this.router.navigate(['todo-lists', todoListId]);
  }

  delete(todoList: TodoList) {
    this.ngxs.dispatch(new DeleteTodoList({ todoListId: todoList.id }));
  }

  trackTodoLists(_: number, todoList: TodoList) {
    return todoList.id;
  }
}
