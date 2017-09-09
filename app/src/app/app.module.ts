import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UiMaterialModule } from './ui-material/ui-material.module';
import { TodosService } from './todos/todos.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UiMaterialModule
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
