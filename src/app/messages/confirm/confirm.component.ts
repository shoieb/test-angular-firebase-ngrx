import { Component, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store, select } from "@ngrx/store";
import { Observable, Subject, takeUntil } from "rxjs";
import { Message } from "src/app/domain/models/message";
import { DeleteMessage } from "src/app/domain/state/actions/message.action";
import { MessageAppState } from "src/app/domain/state/app.state";
import { getMessageByID } from "src/app/domain/state/reducers/message.reduce";

@Component({
	selector: "app-confirm",
	templateUrl: "./confirm.component.html",
	styleUrls: ["./confirm.component.scss"],
})
export class ConfirmComponent implements OnDestroy {

	notifier$ = new Subject<void>();

	result$!: Observable<Message>;
	loading$!: Observable<Boolean>;
	error$!: Observable<Error | undefined>;

	constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Message,
		private _store: Store<MessageAppState>,
		private _snackBar: MatSnackBar) {

	}

	deleteMessage(data: Message) {
		this._store.dispatch(DeleteMessage({ id: data.id }));
		this.result$ = this._store.pipe(select(getMessageByID));
		this.loading$ = this._store.select((store) => store.message.loading);
		this.error$ = this._store.select((store) => store.message.error);

		this.result$.pipe(takeUntil(this.notifier$)).subscribe((result) => { this._snackBar.open('Deleted successfully', 'close'); this.dialogRef.close(true); });
		this.error$.pipe(takeUntil(this.notifier$)).subscribe((error) => { if (error) { this._snackBar.open('Something went wrong!', 'close') } });
	}

	onNoClick() {
		this.dialogRef.close(false);
	}

	ngOnDestroy(): void {
		this.notifier$.next();
		this.notifier$.complete();
	}
}
