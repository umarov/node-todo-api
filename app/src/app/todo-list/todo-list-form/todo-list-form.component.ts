import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators/take';
import { Router } from '@angular/router';

import { TodoList } from '../todo-lists/todo-list';
import { TodoListsService } from '../todo-lists/todo-lists.service';

@Component({
  selector: 'app-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss']
})
export class TodoListFormComponent implements OnInit {
  todoList = new TodoList();
  colors = [
    'yellow',
    'white',
    'lightyellow',
    'floralwhite',
  ];

  constructor(
    private todoListsService: TodoListsService,
    private router: Router
  ) {}

  ngOnInit() {}

  onCreate() {
    this.todoListsService
      .createTodoList(this.todoList)
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
