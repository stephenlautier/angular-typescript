module App {

	var app = angular.module(Module);

	export class Config {
		static id = "config";
		constructor() {

		}

		name = "Heroes";
		version = "1.0.0-alpha";
		events = {
			myEvent: "example",
			uiRouter: {
				$stateChangeError: "$stateChangeError",
				$stateChangeStart: "$stateChangeStart",
				$stateChangeSuccess: "$stateChangeSuccess",
				$stateNotFound: "$stateNotFound"
			}
		}
		remoteUri = new RemoteUriConfig();
	}

	export class RemoteUriConfig {

		base = "/api/";
		account = {
			login: `${this.base}/login`
		}
	}

    app.constant(Config.id, new Config());

	app.config((
		$logProvider: ng.ILogProvider,
		$locationProvider: ng.ILocationProvider
		) => {

		// turn debugging off/on (no info or warn)
		if ($logProvider.debugEnabled) {
			$logProvider.debugEnabled(true);
		}

//		// remove the hash tag
//		$locationProvider.html5Mode({
//			enabled: true
//		});
	});
}