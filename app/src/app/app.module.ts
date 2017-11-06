import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
 } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UiMaterialModule } from './ui-material/ui-material.module';
import { TodoListsService } from './todo-lists/todo-lists.service';
import { TodoItemsComponent } from './todoItems/todoItems.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoItemsService } from './todoItems/todoItems.service';
import { AppRoutesModule } from './app-routes/app-routes.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TokenInterceptor } from './login/auth/token.interceptor';
import { AuthService } from './login/auth/auth.service';
import { AuthInterceptor } from './login/auth/auth.interceptor';
import { TodoListFormComponent } from './todo-list-form/todo-list-form.component';
import { TodoListComponent } from './todo-lists/todo-list/todo-list.component';

import { reducer } from './store/reducers/reducer';
import { TodoListEffects } from './store/effects/effects';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent,
    TodoListsComponent,
    LoginComponent,
    PageNotFoundComponent,
    TodoListFormComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    UiMaterialModule,
    AppRoutesModule,
    StoreModule.forRoot({ todo: reducer }),
    EffectsModule.forRoot([ TodoListEffects ])
  ],
  providers: [
    TodoListsService,
    TodoItemsService,
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
