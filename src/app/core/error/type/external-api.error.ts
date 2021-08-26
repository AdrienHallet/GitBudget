import { ApplicationError } from "./application.error";

/**
 * Represents a type of external API the application can call.
 */
class ExternalApiType {
  /**
   * The External API's name.
   */
  apiName: string;

  /**
   * Default constructor.
   *
   * @param apiName The API's name
   */
  constructor(apiName: string) {
    this.apiName = apiName
  }
}

/**
 * Thrown when the application encountered an error
 * during an attempt to communicate with an external API.
 */
export class ExternalApiError extends ApplicationError {

  /* CONTEXTS */
  public static GITHUB = new ExternalApiType('GitHub');

  /**
   * Default constructor.
   *
   * @param context The error's context
   * @param error The http error
   */
  constructor(
    public context: ExternalApiType,
    public error: any) {
      super(context.apiName, error.message);
  }

}

