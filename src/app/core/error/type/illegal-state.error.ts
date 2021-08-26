import { ApplicationError } from "./application.error";

/**
 * Thrown when the application attemps to perform an action, which cannot be
 * pursued due to an incorrect state of the current stack.
 */
export class IllegalStateError implements ApplicationError {
  name: string = 'IllegalStateError';
  message: string;
  stack?: string | undefined;

  constructor(message: string) {
    this.message = message;
  }

}

