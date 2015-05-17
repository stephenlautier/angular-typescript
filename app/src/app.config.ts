module App {

	var app = angular.module(Module);

	export class Config {
		static id = "config";
		constructor() {

		}

		name = "Movies";
		version = "1.0.0-alpha";
		events = {
			$stateChangeError: "todo"
		}
		remoteUri = new RemoteUriConfig();
	}

	export class RemoteUriConfig {

		base = "/api/";
		account = {
			login: `${this.base}/login`
		}
	}

	app.constant(Config.id, new Config())

	app.config(() => {



	});

}