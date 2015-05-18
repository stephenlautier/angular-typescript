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
				templateUrl: "areas/layout/layout.html",
				controller: LayoutController.id,
				controllerAs: defaultControllerAs,
			});
			
			$stateProvider.state("shell.home", {
				url: "",
				templateUrl: "areas/home/home.html",
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
				templateUrl: "areas/error/error.html",
				controller: ErrorController.id,
				controllerAs: defaultControllerAs
			});
			
			$urlRouterProvider.otherwise("/");

		}]);

}