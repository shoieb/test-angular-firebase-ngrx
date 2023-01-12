import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Message } from "../models/message";

@Injectable({
	providedIn: "root",
})
export class MessageService {

	readonly PATH = "Messages";

	constructor(private db: AngularFirestore) { }

	saveMessage(message: Message) {
		const messageData = JSON.parse(JSON.stringify(message));
		return this.db.collection(this.PATH).add(messageData);
	}

	getAllMessages(): Observable<Message[]> {
		const messageList = this.db
			.collection<Message>(this.PATH, (ref) => ref.orderBy("name"))
			.snapshotChanges()
			.pipe(
				map((actions) => {
					return actions.map((c) => ({
						messageId: c.payload.doc.id,
						...c.payload.doc.data(),
					}));
				})
			);
		return messageList;
	}

	getMessageById(messageId: string): Observable<Message> {
		const messageData = this.db
			.doc<Message>(`${this.PATH}/` + messageId)
			.valueChanges();
		return <Observable<Message>>messageData;
	}

	updateMessage(messageId: string, message: Message) {
		const messageData = JSON.parse(JSON.stringify(message));
		return this.db.doc(`${this.PATH}/` + messageId).update(messageData);
	}

	deleteMessage(messageId: string) {
		return this.db.doc(`${this.PATH}/` + messageId).delete();
	}
}
