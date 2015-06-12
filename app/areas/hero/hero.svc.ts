module App {
	'use strict';

	export interface IHeroService {
		getAll(): Hero[];
		getByKey(key: string): Hero;
	}

	export class HeroService implements IHeroService {
		static id = "heroService";

		private _logger: ILog;

					
		/*@ngInject*/
		constructor(
			private loggerFactory: ILoggerFactory,
			private config: Config
			) {

			this._logger = loggerFactory(HeroService.id);
			this._logger.debug("ctor", "init");
		}

		private _heroes: Hero[] = [
			{ key: "azmodan", title: "Azmodan", caption: "Lord of Sin", role: "specialist", description: "The Lord of Sin rules over a densely populated land" },
			{ key: "jaina", title: "Jaina Proudmoore", caption: "Archmage", role: "assassin", description: "Jaina Proudmoore is a master spellcaster, trained by the legendary Archmage Antonidas himself." },
			{ key: "brightwing", title: "Brightwing", caption: "Faerie Dragon", role: "support", description: "The Faerie Dragons of Ashenvale are known for their playful demeanor, seemingly disappearing at a whim." },
			{ key: "valla", title: "Valla", caption: "Demon Hunter", role: "assassin", description: "Valla witnessed the ferocity of hellspawn firsthand as the demons ravaged her village and left her for dead." },
			{ key: "muradin", title: "Muradin", caption: "Mountain King", role: "warrior", description: "Once a mentor to Prince Arthas, Muradin was unable to prevent him from becoming the Lich King." },
		]

		getAll() {
			return this._heroes;
		}

		getByKey(key: string): Hero {

			this._logger.info("getByKey", "finding...", { key: key });
			var result = _.findWhere(this._heroes, { key: key });
			this._logger.info("getByKey", "find complete.", { key: key, result: result });
			return result;
		}

	}

	angular.module(Module)
		.service(HeroService.id, HeroService);

}