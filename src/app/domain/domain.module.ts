import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffect } from './state/effects/message.effect';
import { messageReducer } from './state/reducers/message.reduce';

@NgModule({
	declarations: [],
	imports: [
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		StoreModule.forRoot({
			message: messageReducer,
		}),
		EffectsModule.forRoot([MessageEffect])
	],
	providers: []
})
export class DomainModule { }
