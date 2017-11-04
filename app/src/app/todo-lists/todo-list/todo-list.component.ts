import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TodoList } from '../todo-list';
import { TodoListsService } from '../todo-lists.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todoList: TodoList;
  todoListSub: Subscription;
  creatingNewItem = false;
  constructor(
    private route: ActivatedRoute,
    private todoListsService: TodoListsService
  ) {}

  ngOnInit() {
    this.todoListSub = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.todoListsService.getTodoList(+params.get('id'));
        })
      )
      .subscribe(todoList => (this.todoList = todoList));
  }

  ngOnDestroy() {
    this.todoListSub.unsubscribe();
  }
}
