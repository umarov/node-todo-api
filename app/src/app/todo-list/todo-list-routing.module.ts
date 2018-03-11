import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoListComponent } from './todo-lists/todo-list/todo-list.component';
import { TodoListFormComponent } from './todo-list-form/todo-list-form.component';
import { AuthGuard } from '../login/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'todo-lists',
        component: TodoListsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'todo-lists/:id',
        component: TodoListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-todo-lists',
        component: TodoListFormComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule {}
