import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TodoListsService } from './todo-lists.service';
import { TodoLists } from './todo-lists';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class TodoListsComponent implements OnInit {
  todoLists: Observable<TodoLists[]>;

  constructor(private todoListsService: TodoListsService) {
    this.todoLists = this.todoListsService.getTodoLists();
  }

  ngOnInit() {
  }

}
