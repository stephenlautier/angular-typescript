module App {
	'use strict';

	export class LayoutController {
		static id = "layoutController";

		private _logger: ILog;

		get appTitle() {
			return this.config.name;
		}

		get appVersion() {
			return this.config.version;
		}

		get user() {
			return this.userInfo.alias;
		}
					
		/*@ngInject*/
		constructor(
			private loggerFactory: ILoggerFactory,
			private notificationService: INotificationService,
			private userInfo: IUserInfo,
			private config: Config
			) {

			this._logger = loggerFactory(LayoutController.id);
			this._logger.info("ctor", "init");
			this.unreadNotificationsCount = this.notificationService.getUnreadCount();			
		}

		unreadNotificationsCount: number = 0;
	}

	angular.module(Module)
		.controller(LayoutController.id, LayoutController);

}