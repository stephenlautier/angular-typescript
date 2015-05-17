module App {

	angular.module(Module)
		.config([
		"$stateProvider",
		"$urlRouterProvider",
		(
			$stateProvider: angular.ui.IStateProvider,
			$urlRouterProvider: angular.ui.IUrlRouterProvider) => {
			'use strict';
			console.log("config routing..");
			var defaultControllerAs = "vm";
			
			$stateProvider.state("shell", {
				url: "/",
				abstract: true,
				templateUrl: "components/shell/shell.html",
				controller: ShellController.id,
				controllerAs: defaultControllerAs,
			});
			
			$stateProvider.state("shell.home", {
				url: "",
				templateUrl: "components/home/home.html",
				controller: HomeController.id,
				controllerAs: defaultControllerAs,
//				resolve: {
//					fail: () => {
//						throw new Error("Fellaq!");
//					}
//				}
			});
			
			$stateProvider.state("error", {
				url: "/error",
				templateUrl: "components/error/error.html",
				controller: ErrorController.id,
				controllerAs: defaultControllerAs
			});
			
			$urlRouterProvider.otherwise("/");

		}]);

}