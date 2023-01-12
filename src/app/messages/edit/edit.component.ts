import { Component, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store, select } from "@ngrx/store";
import { Observable, Subject, takeUntil } from "rxjs";
import { Message } from "src/app/domain/models/message";
import { EditMessage, AddMessage } from "src/app/domain/state/actions/message.action";
import { MessageAppState } from "src/app/domain/state/app.state";
import { getMessageByID } from "src/app/domain/state/reducers/message.reduce";

@Component({
	selector: "app-edit",
	templateUrl: "./edit.component.html",
	styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnDestroy {

	notifier$ = new Subject<void>();

	result$!: Observable<Message>;
	loading$!: Observable<Boolean>;
	error$!: Observable<Error | undefined>;

	constructor(public dialogRef: MatDialogRef<EditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Message,
		private _store: Store<MessageAppState>,
		private _snackBar: MatSnackBar) {

	}

	saveMessage(data: Message) {
		if (data.id) {
			this._store.dispatch(EditMessage({ id: data.id, message: data }));
			this.result$ = this._store.pipe(select(getMessageByID));
			this.result$.pipe(takeUntil(this.notifier$))
				.subscribe((result) => {
					this._snackBar.open('Updated successfully', 'close'); this.dialogRef.close(data);
				});
		} else {
			this._store.dispatch(AddMessage({ message: data }));
			this.result$ = this._store.pipe(select(getMessageByID));
			this.result$.pipe(takeUntil(this.notifier$))
				.subscribe((result) => {
					this._snackBar.open('Added successfully', 'close'); this.dialogRef.close(data);
				});
		}
		this.loading$ = this._store.select((store) => store.message.loading);
		this.error$ = this._store.select((store) => store.message.error);

		this.error$.pipe(takeUntil(this.notifier$)).subscribe((error) => { if (error) { this._snackBar.open('Something went wrong!', 'close') } } );
	}

	onNoClick() {
		this.dialogRef.close();
	}

	ngOnDestroy() {
		this.notifier$.next();
		this.notifier$.complete();
	}
}
