module App {
	'use strict';

	export class BasicFormController {
		static id = "basicFormController";

		private _logger: ILog;
			
		/*@ngInject*/
		constructor(			
			private loggerFactory: ILoggerFactory,
			private config: Config,
			private userInfo: IUserInfo
			) {

			this._logger = loggerFactory(BasicFormController.id);
			this._logger.info("ctor", "init", { hello: "yo", config: config });
			this._logger.debug("ctor", "init debug", { hello: "yo", config: config });
		}

		title = "Basic Form";
		alias: string;

		save() {
			this._logger.info("save", "yay!", { alias: this.alias });
			this.userInfo.alias = this.alias;
		}

	}

	angular.module(Module)
		.controller(BasicFormController.id, BasicFormController);

}