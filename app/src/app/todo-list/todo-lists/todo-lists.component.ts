import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators/take';

import { TodoListsService } from './todo-lists.service';
import { TodoList } from './todo-list';

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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.todoLists = this.todoListsService.getTodoLists();
  }

  ngOnInit() {}

  createTodoList() {
    this.router.navigate(['new'], {relativeTo: this.route});
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
          this.todoListsService.getTodoLists();
        },
        err => {
          console.error(err);
        }
      );
  }

  trackTodoLists(index, todoList: TodoList) {
    return todoList.id;
  }
}
