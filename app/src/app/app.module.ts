import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UiMaterialModule } from './ui-material/ui-material.module';
import { TodoListsService } from './todo-lists/todo-lists.service';
import { TodosComponent } from './todos/todos.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodosService } from './todos/todos.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoListsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UiMaterialModule
  ],
  providers: [
    TodoListsService,
    TodosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
