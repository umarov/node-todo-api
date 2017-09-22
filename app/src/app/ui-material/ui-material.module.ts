import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdListModule,
  MdCardModule,
  MdInputModule,
  MdSnackBarModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
    MdSnackBarModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
    MdSnackBarModule
  ]
})
export class UiMaterialModule { }
