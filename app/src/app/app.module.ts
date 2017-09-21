import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
 } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UiMaterialModule } from './ui-material/ui-material.module';
import { TodoListsService } from './todo-lists/todo-lists.service';
import { TodosComponent } from './todos/todos.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodosService } from './todos/todos.service';
import { AppRoutesModule } from './app-routes/app-routes.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TokenInterceptor } from './login/auth/token.interceptor';
import { AuthService } from './login/auth/auth.service';
import { AuthInterceptor } from './login/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoListsComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    UiMaterialModule,
    AppRoutesModule
  ],
  providers: [
    TodoListsService,
    TodosService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
