import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    console.log('I caught an error !');
    console.error(error);
  }

}
