module App {

	var app = angular.module(Module, [
		"ngAnimate",
		"ngCookies",
		"ngTouch",
		"ngSanitize",
		"ui.router",
		"ui.bootstrap",
		ngCommand.ModuleName
	]);

	app.run((
		$rootScope: ng.IRootScopeService,
		config: Config,
		loggerFactory: ILoggerFactory,
		$state: angular.ui.IStateService) => {

		var logger = loggerFactory("app.startup");
		logger.info("run", "app launched!");

		$rootScope.$on(config.events.uiRouter.$stateChangeError, (event: ng.IAngularEvent, toState: angular.ui.IState, toParams: any, fromState: angular.ui.IState, fromParams: any, error: Error) => {

			logger.error("$stateChangeError", "an error occured while loading state.", error);
			$state.go("error");
		});
	});
}