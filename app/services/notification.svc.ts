module App {

	export interface INotificationMessage {
		title: string;
		isRead: boolean;
		receivedDate: Date;
	}

	export interface INotificationService {
		getAllUnreadMessages(): INotificationMessage[];
		getUnreadCount(): number;

		setMessages(messages: INotificationMessage[]): void;
	}


	class NotificationService implements INotificationService {
		static id = "notificationService";

		private _messages: INotificationMessage[];

		constructor() {
			//TODO: move to bootstrapping.
			var messages: INotificationMessage[] = [
				{ title: "An enemy has been slain.", isRead: false, receivedDate: new Date() },
				{ title: "Password has been changed!", isRead: true, receivedDate: new Date() },
				{ title: "You have leveled up!", isRead: false, receivedDate: new Date() }
			];
			this._messages = messages;
		}

		getAllUnreadMessages() {
			if (!this._messages)
				return void 0;
			return this._messages.filter((value: INotificationMessage) => {
				return !value.isRead;
			});
		}

		getUnreadCount() {
			var msgs = this.getAllUnreadMessages();
			return msgs ? msgs.length : 0;
		}

		setMessages(messages: INotificationMessage[]) {
			this._messages = messages;
		}
	}

	angular.module(App.Module)
		.service(NotificationService.id, NotificationService);
}