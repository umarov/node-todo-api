import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class UiMaterialModule { }
