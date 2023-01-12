import { createAction, props } from "@ngrx/store"
import { Message } from "../../models/message"


export enum MessageActionTypes {
	FETCH_MESSAGE = "[MESSAGE] Fetch Message",
	FETCH_MESSAGE_SUCCESS = "[MESSAGE] Fetch Message Success",
	FETCH_MESSAGE_FAILURE = "[MESSAGE] Fetch Message Failed",
	FETCH_MESSAGE_BY_ID = "[MESSAGE] Fetch Message By ID",
	FETCH_MESSAGE_BY_ID_SUCCESS = "[MESSAGE] Fetch Message By ID Success",
	FETCH_MESSAGE_BY_ID_FAILURE = "[MESSAGE] Fetch Message By ID Failed",
	ADD_MESSAGE = '[MESSAGE] Add',
	ADD_MESSAGE_SUCCESS = "[MESSAGE] Add Message Success",
	ADD_MESSAGE_FAILURE = "[MESSAGE] Add Message Failed",
	EDIT_MESSAGE = '[MESSAGE] EDIT',
	EDIT_MESSAGE_SUCCESS = "[MESSAGE] EDIT Message Success",
	EDIT_MESSAGE_FAILURE = "[MESSAGE] EDIT Message Failed",
	DELETE_MESSAGE = "[MESSAGE] Delete Message",
	DELTE_MESSAGE_SUCCESS = "[MESSAGE] Delete Message Success",
	DELETE_MESSAGE_FAILURE = "[MESSAGE] Delete Message Failed"
}

export const FetchMessage = createAction(
	MessageActionTypes.FETCH_MESSAGE
)

export const FetchMessageSuccess = createAction(
	MessageActionTypes.FETCH_MESSAGE_SUCCESS,
	props<{ messages: Message[] }>()
)

export const FetchMessageFailure = createAction(
	MessageActionTypes.FETCH_MESSAGE_FAILURE,
	props<{ error: any }>()
)

export const FetchMessageByID = createAction(
	MessageActionTypes.FETCH_MESSAGE_BY_ID,
	props<{ id: string }>()
)

export const FetchMessageByIDSuccess = createAction(
	MessageActionTypes.FETCH_MESSAGE_BY_ID_SUCCESS,
	props<{ message: Message }>()
)

export const FetchMessageByIDFailure = createAction(
	MessageActionTypes.FETCH_MESSAGE_BY_ID_FAILURE,
	props<{ error: any }>()
)

export const AddMessage = createAction(
	MessageActionTypes.ADD_MESSAGE,
	props<{ message: Message }>()
)

export const AddMessageSuccess = createAction(
	MessageActionTypes.ADD_MESSAGE_SUCCESS,
	props<{ message: Message }>()
)

export const AddMessageFailure = createAction(
	MessageActionTypes.ADD_MESSAGE_FAILURE,
	props<{ error: any }>()
)

export const EditMessage = createAction(
	MessageActionTypes.EDIT_MESSAGE,
	props<{ id: string, message: Message }>()
)

export const EditMessageSuccess = createAction(
	MessageActionTypes.EDIT_MESSAGE_SUCCESS,
	props<{ message: Message }>()
)

export const EditMessageFailure = createAction(
	MessageActionTypes.EDIT_MESSAGE_FAILURE,
	props<{ error: any }>()
)

export const DeleteMessage = createAction(
	MessageActionTypes.DELETE_MESSAGE,
	props<{ id: string }>()
)
export const DeleteMessageSuccess = createAction(
	MessageActionTypes.DELTE_MESSAGE_SUCCESS,
	props<{ id: string }>()
)
