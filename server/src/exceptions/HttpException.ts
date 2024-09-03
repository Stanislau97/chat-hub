interface IHttpException {
  id: number;
  message: string;
}

export class HttpException extends Error {
  message: string;
  id: number;

  constructor(
    public status: number,
    obj: IHttpException,
  ) {
    super(obj.message);

    this.message = obj.message;
    this.id = obj.id;
  }
}
