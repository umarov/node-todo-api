import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { HomeComponent } from './home/home.component';

import { TodoListsService } from './todo-lists/todo-lists.service';
import { TodoItemsComponent } from './todoItems/todoItems.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoItemsService } from './todoItems/todoItems.service';
import { TodoListFormComponent } from './todo-list-form/todo-list-form.component';
import { TodoListComponent } from './todo-lists/todo-list/todo-list.component';
import { UiMaterialModule } from '../ui-material/ui-material.module';
import { TodoListStore } from './store/todo-list.store';

@NgModule({
  imports: [
    CommonModule,
    TodoListRoutingModule,
    FormsModule,
    UiMaterialModule,
    NgxsModule.forRoot([TodoListStore])
  ],
  declarations: [
    HomeComponent,
    TodoItemsComponent,
    TodoListsComponent,
    TodoListFormComponent,
    TodoListComponent
  ],
  providers: [TodoListsService, TodoItemsService, TodoListStore]
})
export class TodoListModule {}
