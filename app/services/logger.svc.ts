module App {

	const enum LogType {
		Info,
		Warning,
		Error,
		Success
	}

	export interface ILog {

		info(source: string, message?: string, data?: any): void;
		error(source: string, message?: string, data?: any): void;
		warning(source: string, message?: string, data?: any): void;
	}

	export interface ILoggerService {

		log(logType: LogType, message: string, data?: any);

	}

	export class LoggerService implements ILoggerService {
		static id = "loggerService";
		
		constructor() {

		}

		log(logType: LogType, message: string, data?: any) {
			switch (logType) {
				case LogType.Info:
					console.info(message, data);
					break;
				case LogType.Error:
					console.error(message, data);
					break;
				case LogType.Warning:
					console.warn(message, data);
					break;
				default:
					console.log(message, data);
					break;
			}
		}
	}

	export class Logger implements ILog {
		
		constructor(
			private sourceId: string,
			private loggerService: ILoggerService
			) {

		}

		info(source: string, message?: string, data?: any) {					
			this._log(this.sourceId, source, LogType.Info, message, data);
		}

		error(source: string, message?: string, data?: any) {
			this._log(this.sourceId, source, LogType.Error, message, data);
		}
			
		warning(source: string, message?: string, data?: any) {
			this._log(this.sourceId, source, LogType.Warning, message, data);
		}

		private _log(sourceId: string, source: string, logType: LogType, message?: string, data?: any) {
			var msg = `[${sourceId}::${source}] ${message}`;
			this.loggerService.log(logType, msg, data);
		}

	}

	export interface ILoggerFactory {
		(sourceId: string): ILog;
	}

	angular.module(App.Module)
		.service(LoggerService.id, LoggerService)
		.factory("loggerFactory", (loggerService) => {

		return (sourceId): ILog => {
			return new Logger(sourceId, loggerService);
		};

	});
}