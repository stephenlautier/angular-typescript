module App{
	
	var app = angular.module(Module, [		
		"ngAnimate",
		"ngCookies",
		"ngTouch",
		"ngSanitize",
		"ui.router",
		"ui.bootstrap"		
	]);

	app.run(() => {
		
		console.log("app run!");
		
	});
}