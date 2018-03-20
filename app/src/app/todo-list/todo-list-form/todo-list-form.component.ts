import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators/take';
import { Router } from '@angular/router';

import { TodoList } from '../todo-lists/todo-list';
import { Ngxs } from 'ngxs';
import { CreateTodoList } from '../store/events/todo-list.events';

@Component({
  selector: 'app-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss']
})
export class TodoListFormComponent implements OnInit {
  todoList = new TodoList();
  colors = ['yellow', 'white', 'lightyellow', 'floralwhite'];

  constructor(
    private router: Router,
    private ngxs: Ngxs
  ) {}

  ngOnInit() {}

  onCreate() {
    this.ngxs
      .dispatch(new CreateTodoList({ todoList: this.todoList }))
      .pipe(take(1))
      .subscribe(
        _ => {
          this.router.navigate(['/todo-lists']);
        },
        error => {
          console.error(error);
        }
      );
  }
}
