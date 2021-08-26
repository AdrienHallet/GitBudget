import { Injectable } from "@angular/core";
import { LoggerLevel } from "./logger-level.enum";

@Injectable({providedIn: 'root'})
export class Logger {

  static LOGGER: Logger;

  private level: LoggerLevel;

  constructor() {
    this.level = LoggerLevel.TRACE;
    Logger.LOGGER = this;
  }

  public debug(message: string, ...args: any[]) {
    if (this.level >= LoggerLevel.DEBUG) console.debug(message, ...args);
  }

  public err(message: string, ...args: any[]) {
    if (this.level >= LoggerLevel.ERROR) console.debug(message, ...args);
  }

}
