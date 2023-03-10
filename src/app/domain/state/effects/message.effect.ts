import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { MessageService } from "../../services/message.service";
import { mergeMap, map, catchError, tap, switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import * as MessageActions from '../actions/message.action';
import { of } from 'rxjs';

@Injectable()
export class MessageEffect {
	constructor(private _actions$: Actions,
		private _messageService: MessageService) { }

	loadMessage$ = createEffect(() =>
		this._actions$.pipe(
			ofType(MessageActions.FetchMessage),
			switchMap(() =>
				this._messageService.getAllMessages().pipe(
					map((messages) => MessageActions.FetchMessageSuccess({ messages })),
					catchError(error => of(MessageActions.FetchMessageFailure({ error })))
				)
			)
		),
	)

	loadMessageByID$ = createEffect(() =>
		this._actions$.pipe(
			ofType(MessageActions.FetchMessageByID),
			switchMap(({ id }) =>
				this._messageService.getMessageById(id).pipe(
					map((message) => MessageActions.FetchMessageByIDSuccess({ message })),
					catchError(error => of(MessageActions.FetchMessageByIDFailure({ error })))
				)
			)
		),
	)

	addMessage$ = createEffect(() =>
		this._actions$.pipe(
			ofType(MessageActions.AddMessage),
			mergeMap(({ message }) =>
				of(this._messageService.saveMessage(message)).pipe(
					map(() => MessageActions.AddMessageSuccess({ message })),
					catchError(error => of(MessageActions.AddMessageFailure({ error })))
				),
			)
		)
	)

	editMessage$ = createEffect(() =>
		this._actions$.pipe(
			ofType(MessageActions.EditMessage),
			mergeMap(({ id, message }) =>
				of(this._messageService.updateMessage(id, message)).pipe(
					map(() => MessageActions.EditMessageSuccess({ message })),
					catchError(error => of(MessageActions.EditMessageFailure({ error })))
				),
			)
		)
	)

	deleteMessage$ = createEffect(() =>
		this._actions$.pipe(
			ofType(MessageActions.DeleteMessage),
			mergeMap(({ id }) =>
				of(this._messageService.deleteMessage(id)).pipe(
					map(() => MessageActions.DeleteMessageSuccess({ id })),
				)
			),
		)
	)
}
