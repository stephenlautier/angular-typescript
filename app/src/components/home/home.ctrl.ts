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
			private config: Config
			) {
			
			this._logger = loggerFactory(HomeController.id);
			this._logger.info("ctor", "init", {hello: "yo", config: config});
						
			//var logger = loggerFactory.get(HomeController.id)
			//logger.error("source", "message"?, { data });
			
		}
		
		title = "mr!";
		language: string;

		doSomething() {
			alert("yay!");
			this._logger.warning("doSomething", "yay!");
		}

		setLanguage() {
			this.translationService.language = this.language;
			this._logger.info("setLanguage", "setting language...", {language: this.language});
		}
		
		getLanguage() {
			var lang = this.translationService.language;
			alert(`Current language ${lang}`)
		}
	}

	angular.module(App.Module)
		.controller(HomeController.id, HomeController);

}