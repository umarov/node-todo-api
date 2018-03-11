import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy
} from '@angular/core';
import { TodoItemsService } from './todoItems.service';
import { TodoItem } from './todoItem';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todoItems.component.html',
  styleUrls: ['./todoItems.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class TodoItemsComponent implements OnInit, OnDestroy {
  @Input() todoListId: string;

  todoItems: Observable<TodoItem[]>;

  constructor(private todoItemsService: TodoItemsService) {}

  ngOnInit() {
    this.todoItems = this.todoItemsService.getTodoItems(this.todoListId);
  }

  ngOnDestroy() {
  }
}
