import { NgModule } from '@angular/core';

import {
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatExpansionModule,
  MatDialogModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class AppMaterialModule { }
