module App {

	angular.module(App.Module)
		.config([
		"$stateProvider",
		"$urlRouterProvider",
		(
			$stateProvider: angular.ui.IStateProvider,
			$urlRouterProvider: angular.ui.IUrlRouterProvider) => {
			'use strict';
			console.log("config routing..");
			var defaultControllerAs = "vm";
			
			$stateProvider.state("home", {
				url: "",
				templateUrl: "components/home/home.html",
				controller: HomeController.id,
				controllerAs: defaultControllerAs
			});
			
			$urlRouterProvider.otherwise("/");

		}]);

}