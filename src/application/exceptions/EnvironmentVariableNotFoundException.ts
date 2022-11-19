export class EnvironmentVariableNotFoundException extends Error {
  constructor() {
    super("404: Environment variable not found!");
  }
}
