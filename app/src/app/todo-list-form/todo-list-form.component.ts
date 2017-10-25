import { Component, OnInit } from '@angular/core';
import { TodoList } from '../todo-lists/todo-list';
import { TodoListsService } from '../todo-lists/todo-lists.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
        response => {
          this.router.navigate(['/todo-lists']);
        },
        error => {
          console.error(error);
        }
      );
  }
}
