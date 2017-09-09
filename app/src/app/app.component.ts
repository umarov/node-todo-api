import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TodosService } from './todos/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AppComponent implements OnInit {
  todos;

  constructor(private todosService: TodosService) {
    this.todos = this.todosService.getTodos();
  }

  ngOnInit(): void {

  }
}
