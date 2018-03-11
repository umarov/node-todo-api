import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuard } from '../login/auth/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'todo-lists', loadChildren: 'app/todo-list/todo-list.module#TodoListModule' },
  {
    path: '',
    redirectTo: '/todo-lists',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthGuard]
})
export class AppRoutesModule {}
