import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Message } from "../domain/models/message";
import { FetchMessage } from "../domain/state/actions/message.action";
import { MessageAppState } from "../domain/state/app.state";
import { getMessages } from "../domain/state/reducers/message.reduce";
import { ConfirmComponent } from "./confirm/confirm.component";
import { EditComponent } from "./edit/edit.component";

@Component({
	selector: "app-messages",
	templateUrl: "./messages.component.html",
	styleUrls: ["./messages.component.scss"],
})
export class MessagesComponent implements OnInit {

	displayedColumns: string[] = ['id', 'name', 'message', 'date', 'actions'];
	msgList$!: Observable<Message[]>;
	loading$!: Observable<Boolean>;
	error$!: Observable<Error | undefined>;

	constructor(private _store: Store<MessageAppState>,
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar) { }

	ngOnInit() {
		this._store.dispatch(FetchMessage());
		this.msgList$ = this._store.pipe(select(getMessages));
		this.loading$ = this._store.select((store) => store.message.loading);
		this.error$ = this._store.select((store) => store.message.error);
		this.error$.subscribe((error) => { if (error) { this._snackBar.open('Something went wrong!', 'close') } } );
	}

	openDialog(data: Message = {} as Message) {
		const dialogRef = this._dialog.open(EditComponent, {
			data: { id: data.id, name: data.name || '', message: data.message || '', date: new Date() }
		});

		dialogRef.afterClosed().subscribe(result => {

		});
	}

	deleteDialog(data: Message) {
		const dialogRef = this._dialog.open(ConfirmComponent, {
			data: { id: data.id, name: data.name || '', message: data.message || '', date: data.date || new Date() }
		});

		dialogRef.afterClosed().subscribe(result => {

		});
	}
}
