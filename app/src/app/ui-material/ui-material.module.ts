import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdListModule,
  MdCardModule,
  MdInputModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdInputModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdInputModule
  ]
})
export class UiMaterialModule { }
