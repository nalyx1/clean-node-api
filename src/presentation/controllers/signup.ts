import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator
} from '../protocols';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}
  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body;

      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return {
        statusCode: 200,
        body: { name, email }
      };
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
