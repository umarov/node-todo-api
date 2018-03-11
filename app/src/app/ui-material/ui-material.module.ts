import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatMenuModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule
  ]
})
export class UiMaterialModule { }
