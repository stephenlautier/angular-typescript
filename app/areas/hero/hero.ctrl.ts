module App {
	'use strict';

	export class HeroController {
		static id = "heroController";

		private _logger: ILog;
				
					
		/*@ngInject*/
		constructor(
			private translationService: ITranslationService,
			private loggerFactory: ILoggerFactory,
			private config: Config,
			private heroService: IHeroService,
			$stateParams: angular.ui.IStateParamsService
			) {

			this._logger = loggerFactory(HeroController.id);
			this._logger.debug("ctor", "init", { $stateParams });

			var key = $stateParams["hero"];
			this.model = heroService.getByKey(key);
		}

		model: Hero;
	}

	angular.module(Module)
		.controller(HeroController.id, HeroController);

}