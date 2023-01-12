import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Message } from "../models/message";

@Injectable({
	providedIn: "root",
})
export class MessageService {

	readonly PATH = "messages";

	constructor(private _db: AngularFirestore) { }

	saveMessage(message: Message) {
		const messageData = JSON.parse(JSON.stringify(message));
		return this._db.collection(this.PATH).add(messageData);
	}

	getAllMessages(): Observable<Message[]> {
		const messageList = this._db
			.collection<Message>(this.PATH, (ref) => ref.orderBy("name"))
			.snapshotChanges()
			.pipe(
				map((actions) => {
					return actions.map((c) => ({
						id: c.payload.doc.id,
						name: c.payload.doc.data().name,
						message: c.payload.doc.data().message,
						date: c.payload.doc.data().date
					}));
				})
			);
		return messageList;
	}

	getMessageById(messageId: string): Observable<Message> {
		const messageData = this._db
			.doc<Message>(`${this.PATH}/` + messageId)
			.valueChanges();
		return <Observable<Message>>messageData;
	}

	updateMessage(messageId: string, message: Message) {
		const messageData = JSON.parse(JSON.stringify(message));
		return this._db.doc(`${this.PATH}/` + messageId).update(messageData);
	}

	deleteMessage(messageId: string) {
		return this._db.doc(`${this.PATH}/` + messageId).delete();
	}
}
