module App {
	'use strict';

	export class ErrorController {
		static id = "errorController";

		private _logger: ILog;
					
		/*@ngInject*/
		constructor(
			private loggerFactory: ILoggerFactory,
			private $rootElement: ng.IRootElementService
			) {

			this._logger = loggerFactory(ErrorController.id);
			this._logger.info("ctor", "init");
			$rootElement.addClass("error");
		}

	}

	angular.module(Module)
		.controller(ErrorController.id, ErrorController);

}