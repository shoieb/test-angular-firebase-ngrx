import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MessagesComponent } from './messages.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
	{ path: '', component: MessagesComponent }
];

@NgModule({
	declarations: [
		MessagesComponent,
		EditComponent,
		ConfirmComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MatDialogModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		RouterModule.forChild(routes)
	],
	providers: [
		{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
	]
})
export class MessagesModule { }
