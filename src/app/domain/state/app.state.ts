import { MessageState } from "./reducers/message.reduce";

export interface MessageAppState {
	readonly message: MessageState;
}
