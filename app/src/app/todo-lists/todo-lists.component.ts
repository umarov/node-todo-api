import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TodoListsService } from './todo-lists.service';
import { TodoList } from './todo-list';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class TodoListsComponent implements OnInit {
  todoLists: Observable<TodoList[]>;

  constructor(
    private todoListsService: TodoListsService,
    private router: Router
  ) {
    this.todoLists = this.todoListsService.getTodoLists();
  }

  ngOnInit() {}

  createTodoList() {
    this.router.navigate(['/create-todo-lists']);
  }

  showTodoList(todoListId: string) {
    this.router.navigate(['todo-lists', todoListId]);
  }

  delete(todoList) {
    this.todoListsService
      .deleteTodoList(todoList)
      .pipe(take(1))
      .subscribe(
        () => {
          this.todoLists = this.todoListsService.getTodoLists();
        },
        err => {
          console.error(err);
        }
      );
  }
}
