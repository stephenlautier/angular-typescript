module App {
	'use strict';

	export class HomeController {
		static id = "homeController";

		private _logger: ILog;
		
		//static $inject = ["translationService", "loggerFactory", "config"]; // manual way without using ngAnnotate	
		/*@ngInject*/
		constructor(
			private translationService: ITranslationService,
			private loggerFactory: ILoggerFactory,
			private config: Config,
			private heroService: IHeroService
			) {

			this._logger = loggerFactory(HomeController.id);
			this.heroes = heroService.getAll();
		}

		title = "Top Heroes";
		heroes: Hero[];
		language: string;
	}

	angular.module(Module)
		.controller(HomeController.id, HomeController);

}