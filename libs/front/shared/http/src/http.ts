import type { NextApiRequest } from 'next';

import ky, {
  HTTPError as KyHttpError,
  TimeoutError as KyTimeoutError,
} from 'ky-universal';

import getAbsoluteUrl from './getAbsoluteUrl';
import {
  HttpClientFetchError,
  HttpClientNotFoundError,
  HttpClientTimeoutError,
  type HttpOptions,
  HttpStatus,
} from './http-utils';

const _http = ky.create({
  retry: 0,
  headers: {
    Accept: 'application/json',
  },
});

export interface HttpBase {
  <T>(url: string, options?: HttpOptions): Promise<T>;
}

interface HttpClient extends HttpBase {
  readonly extend: (options: HttpOptions) => HttpClient;
}
export function createHttpClient(defaults: HttpOptions = {}): HttpClient {
  const client = async <T>(
    url: string,
    options: HttpOptions = {}
  ): Promise<T> => request(url, { ...defaults, ...options });
  client.create = (options: HttpOptions): HttpClient =>
    createHttpClient(options);
  client.extend = (options: HttpOptions): HttpClient =>
    createHttpClient({ ...defaults, ...options });
  return client;
}

export interface HttpServer extends HttpBase {
  readonly extend: (req: NextApiRequest, options: HttpOptions) => HttpServer;
}
export function createHttpServer(
  req: NextApiRequest,
  defaults: HttpOptions = {}
): HttpServer {
  if (process.env.PORT === undefined) {
    throw new Error('PORT env variable must be defined.');
  }
  const { origin } = getAbsoluteUrl(req, `localhost:${process.env.PORT}`);
  const prefixUrl = origin;

  const defaultOptions = {
    prefixUrl,
    ...defaults,
  };

  const server = async <T>(
    url: string,
    options: HttpOptions = {}
  ): Promise<T> => request(url, { ...defaultOptions, ...options });
  server.extend = (_req: NextApiRequest, options: HttpOptions): HttpServer =>
    createHttpServer(_req, { ...defaultOptions, ...options });
  return server;
}

async function request<T>(url: string, options: HttpOptions): Promise<T> {
  try {
    const response = await _http(url, options);
    if (
      response.headers.get('Content-Type')?.includes('application/json') ??
      false
    ) {
      const data = await response.json<T>();

      return data;
    } else {
      return null as unknown as T;
    }
  } catch (error) {
    if (error instanceof KyHttpError) {
      let response: undefined | Record<string, string> = undefined;
      const contentType = error.response.headers
        .get('content-type')
        ?.split(';')[0];

      if (contentType === 'application/json') {
        try {
          response = (await error.response.json()) as Record<string, string>;
        } catch (e) {
          if (e instanceof SyntaxError) {
            response = undefined;
          } else {
            throw e;
          }
        }
      }
      if (
        error.response.status === HttpStatus.GatewayTimeout ||
        error.response.status === HttpStatus.RequestTimeout
      ) {
        throw new HttpClientTimeoutError(error.message);
      }

      if (error.response.status === HttpStatus.NotFound) {
        throw new HttpClientNotFoundError(error.message);
      }

      throw new HttpClientFetchError(
        error.message,
        response,
        error.response.status
      );
    } else if (error instanceof KyTimeoutError) {
      throw new HttpClientTimeoutError(error.message);
    } else {
      throw error;
    }
  }
}
