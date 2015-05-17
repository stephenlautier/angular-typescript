module App {
	'use strict';

	export class ShellController {
		static id = "shellController";
		
		private _logger: ILog;
					
		/*@ngInject*/	
		constructor(			
			private loggerFactory: ILoggerFactory	
			) {
			
			this._logger = loggerFactory(ShellController.id);
			this._logger.info("ctor", "init");			
		}
	}

	angular.module(Module)
		.controller(ShellController.id, ShellController);

}