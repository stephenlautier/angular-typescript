module App {
	'use strict';

	export interface IUserInfo {
		alias: string;
	}

	export class UserInfo implements IUserInfo {
		static id = "userInfo";

		private _logger: ILog;

					
		/*@ngInject*/
		constructor(
			private loggerFactory: ILoggerFactory
			) {

			this._logger = loggerFactory(UserInfo.id);
		}

		alias: string;
	}

	angular.module(Module)
		.service(UserInfo.id, UserInfo);

}