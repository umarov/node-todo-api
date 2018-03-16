import { Component, ViewEncapsulation, Input } from '@angular/core';
import { TodoItem } from './todoItem';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todoItems.component.html',
  styleUrls: ['./todoItems.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class TodoItemsComponent {
  @Input() todoItems: TodoItem[];

  constructor() {}
}
