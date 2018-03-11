import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoListComponent } from './todo-lists/todo-list/todo-list.component';
import { TodoListFormComponent } from './todo-list-form/todo-list-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: TodoListsComponent
      },
      {
        path: 'new',
        component: TodoListFormComponent
      },
      {
        path: ':id',
        component: TodoListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule {}
