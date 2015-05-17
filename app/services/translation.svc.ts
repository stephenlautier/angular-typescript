module App {

	export interface ITranslationService {
		language: string;
	}


	class TranslationService implements ITranslationService {
		static id = "translationService";
		
		constructor() {

		}
		
		private _language: string;
		get language(){
			return this._language;
		}		
		set language(language: string){
			this._language = language;
		}

	}

	angular.module(App.Module)
		.service(TranslationService.id, TranslationService);
}