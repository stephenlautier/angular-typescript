module App {
	'use strict';

	//TODO: implement commandFactory + commandDirective? 

	export class CommandLabController {
		static id = "commandLabController";

		private _logger: ILog;
			
		/*@ngInject*/
		constructor(
			private $scope: angular.IScope,
			private loggerFactory: ILoggerFactory,
			private config: Config,
			private userInfo: IUserInfo,
			private $timeout: angular.ITimeoutService
			) {

			this._logger = loggerFactory(CommandLabController.id);
			this._logger.info("ctor", "init", { hello: "yo", config: config });
			this._logger.debug("ctor", "init debug", { hello: "yo", config: config });


			// command specific
			this.execute = this.save;
			this.canExecute = () => {
				return !this.isBusy;
			}

			// command
			$scope.$watch(() => {
				return {
					isExecuting: this.isExecuting,
					canExecute: this.canExecute && this.canExecute()
				};
			}, (newValue, oldValue) => {
				this._logger.info("$watch.enabled", "Handle change!", newValue);
				this.isEnabled = !newValue.isExecuting && !!newValue.canExecute;
			}, true);
		}

		title = "Command Lab";
		alias: string;

		isBusy = false;
		
		// command
		isExecuting: boolean = false;
		canExecute: () => boolean;
		execute: () => angular.IPromise<any>;
		isEnabled = true;

		private handleExecute() {

			if (this.isExecuting) {
				this._logger.info("handleExecute", "Still executing! exit.");
				return;
			}

			if (this.canExecute && !this.canExecute()) {
				this._logger.info("handleExecute", "Can execute states nope!");
				return;
			}
			this.isExecuting = true;
			return this.execute()
				.finally(() => {
					this.isExecuting = false;
				});
		}

		saveCmd() {
			this.handleExecute();
		}

		save() {
			this._logger.info("save", "init!");
			return this.$timeout(() => {
				this._logger.info("save", "yay!", { alias: this.alias });
				this.userInfo.alias = this.alias;
			}, 2000);

		}



	}

	angular.module(Module)
		.controller(CommandLabController.id, CommandLabController);

}