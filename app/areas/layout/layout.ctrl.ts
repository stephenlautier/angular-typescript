module App {
	'use strict';

	export class LayoutController {
		static id = "layoutController";
		
		private _logger: ILog;
					
		/*@ngInject*/	
		constructor(			
			private loggerFactory: ILoggerFactory,
			private notificationService: INotificationService
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