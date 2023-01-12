
import { Action } from "@ngrx/store/src/models";
import { createReducer, on, createSelector } from "@ngrx/store";
import { Message } from "../../models/message";
import * as MessageActions from '../actions/message.action';
import { MessageAppState } from "../app.state";

export interface MessageState {
	list: Message[],
	loading: boolean,
	error: Error | undefined
}

export const initialMessageState: MessageState = {
	list: [],
	loading: false,
	error: undefined
};

export const reducer = createReducer(
	initialMessageState,
	on(MessageActions.FetchMessage, state =>
	(console.log('FetchMessage reducer called'), {
		...state,
		loading: true,
	})),

	on(MessageActions.FetchMessageSuccess, (state, { messages }) => (
		(console.log('FetchMessageSuccess reducer called'),
		{
			...state,
			list: messages,
			loading: false
		})),
	),

	on(MessageActions.FetchMessageFailure, (state, { error }) => (
		(console.log('FetchMessageFailure reducer called'), {
			...state,
			error: error,
			loading: false
		})),
	),

	on(MessageActions.FetchMessageByID, state => (
		console.log('FetchMessageByID reducer called'),
		{
			...state,
			loading: true,
		})),

	on(MessageActions.FetchMessageByIDSuccess, (state, { message }) => (
		(console.log('FetchMessageByIDSuccess reducer called'),
		{
			...state,
			list: [message],
			loading: false
		})),
	),

	on(MessageActions.FetchMessageByIDFailure, (state, { error }) => (
		(console.log('FetchMessageByIDFailure reducer called'), {
			...state,
			error: error,
			loading: false
		})),
	),

	on(MessageActions.AddMessage, state =>
	(console.log('AddMessage reducer called'), {
		...state,
		loading: true,
	})),

	on(MessageActions.AddMessageSuccess, (state, { message }) =>
	(console.log('AddMessageSuccess reducer called'), {
		...state,
		list: [...state.list, message],
		loading: false,
	})),

	on(MessageActions.AddMessageFailure, (state, { error }) => (
		(console.log('AddMessageFailure reducer called'), {
			...state,
			error: error,
			loading: false
		}))),

	on(MessageActions.EditMessage, state =>
	(console.log('EditMessage reducer called'), {
		...state,
		loading: true,
	})),

	on(MessageActions.EditMessageSuccess, (state, { message }) => (
		(console.log('EditMessageSuccess reducer called'), {
			...state,
			list: [...state.list, message],
			loading: false,
		}))),

	on(MessageActions.EditMessageFailure, (state, { error }) => (
		(console.log('EditMessageFailure reducer called'), {
			...state,
			error: error,
			loading: false
		}))),

	on(MessageActions.DeleteMessage, state =>
	(console.log('DeleteMessage reducer called'), {
		...state,
		loading: true,
	})),

	on(MessageActions.DeleteMessageSuccess, (state, { id }) =>
	(console.log('DeleteMessageSuccess reducer called'), {
		...state,
		list: state.list.filter(item => item.id !== id),
		loading: false,
	})),
);

export function messageReducer(state: MessageState | undefined, action: Action) {
	return reducer(state, action);
}

const getMessageFeatureState = (state: MessageAppState) => state.message;

export const getMessages = createSelector(
	getMessageFeatureState,
	(state: MessageState) => state.list
);

export const getMessageByID = createSelector(
	getMessageFeatureState,
	(state: MessageState) => state.list[0]
);
