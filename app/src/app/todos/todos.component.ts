import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { TodosService } from './todos.service';
import { Subscription } from 'rxjs/Subscription';
import { Todos } from './todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class TodosComponent implements OnInit, OnDestroy {
  @Input()
  todoListId: number;
  todosSubscription: Subscription;
  todos: Todos[] = [];

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    // this.todosSubscription = this
    //   .todosService
    //   .getTodos(this.todoListId)
    //   .subscribe(todos => this.todos = todos);
  }

  ngOnDestroy() {
    this.todosSubscription.unsubscribe();
  }

}
