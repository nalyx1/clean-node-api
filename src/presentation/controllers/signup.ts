export class SignUpController {
  async handle(httpRequest: any): Promise<any> {
    const { name } = httpRequest.body;

    if (!name)
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      };

    return {
      statusCode: 200,
      body: { name }
    };
  }
}
