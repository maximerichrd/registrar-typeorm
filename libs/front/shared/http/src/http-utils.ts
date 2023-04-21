import type ky from 'ky-universal';

type KyOptions = Parameters<typeof ky['extend']>[0];

type HttpHeader = Exclude<KyOptions['headers'], string[][]>;
export type HttpOptions = Pick<
  KyOptions,
  | 'body'
  | 'hooks'
  | 'json'
  | 'method'
  | 'retry'
  | 'timeout'
  | 'prefixUrl'
  | 'signal'
  | 'searchParams'
> & {
  headers?: HttpHeader;
};

export enum HttpStatus {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  RequestEntityTooLarge = 413,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

export class HttpClientError extends Error {
  public constructor(message?: string) {
    super(message);
    this.name = 'HttpClientError';
    Object.setPrototypeOf(this, HttpClientError.prototype);
  }
}

export class HttpClientFetchError extends HttpClientError {
  public readonly responseType = 'json';

  public constructor(
    message: string,
    public readonly response: unknown,
    public readonly status: HttpStatus
  ) {
    super(message);
    this.name = 'HttpClientFetchError';
    Object.setPrototypeOf(this, HttpClientFetchError.prototype);
  }
}

export class HttpClientTimeoutError extends HttpClientError {
  public constructor(message: string) {
    super(message);
    this.name = 'HttpClientTimeoutError';
    Object.setPrototypeOf(this, HttpClientTimeoutError.prototype);
  }
}

export class HttpClientNotFoundError extends HttpClientError {
  public constructor(message: string) {
    super(message);
    this.name = 'HttpClientNotFoundError';
    Object.setPrototypeOf(this, HttpClientNotFoundError.prototype);
  }
}

export function is2xx(status: HttpStatus): boolean {
  return status >= 200 && status < 300;
}

export function is4xx(status: HttpStatus): boolean {
  return status >= 400 && status < 500;
}

export function is5xx(status: HttpStatus): boolean {
  return status >= 500 && status < 600;
}
