import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { TodoList } from '../todo-list';
import { TodoListsService } from '../todo-lists.service';
import { Observable } from 'rxjs/Observable';
import { TodoItem } from '../../todoItems/todoItem';
import { TodoItemsService } from '../../todoItems/todoItems.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todoList: Observable<TodoList>;
  todoItemText: string;
  todoListId: string;
  creatingNewItem = true;

  constructor(
    private route: ActivatedRoute,
    private todoListsService: TodoListsService,
    private todoItemsService: TodoItemsService
  ) {}

  ngOnInit() {
    this.todoList = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.todoListId = params.get('id');
        return this.todoListsService.getTodoList(this.todoListId);
      })
    );
  }

  ngOnDestroy() {}

  onTodoItemAdded(formObject) {
    const { todoItemText } = formObject.form.value;
    if (todoItemText) {
      const todoItem = new TodoItem(todoItemText);
      this.todoItemsService
        .createTodoItem(this.todoListId, todoItem)
        .pipe(take(1))
        .subscribe(_ => {
          formObject.reset();
        }, console.error);
    }
  }

  todoItemUpdated(todoItem: TodoItem) {
    this.todoItemsService
      .updateTodoItem(this.todoListId, todoItem)
      .pipe(take(1))
      .subscribe();
  }

  removeTodoItem(todoItem: TodoItem) {
    this.todoItemsService
      .deleteTodoItem(this.todoListId, todoItem)
      .pipe(take(1))
      .subscribe();
  }

  trackByTodoItems(_: number, todoItem: TodoItem) {
    return todoItem.id;
  }
}
