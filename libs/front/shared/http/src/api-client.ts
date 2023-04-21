import { createHttpClient, createHttpServer } from './http';
import type { HttpOptions } from './http-utils';

const httpOptions: HttpOptions = {
  prefixUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
};

export const apiClient = createHttpClient(httpOptions);
export const authenticatedApiClient = apiClient.extend({
  hooks: {
    beforeRequest: [
      // you can set the authorization bearer token here
      // @see https://github.com/sindresorhus/ky#hooksbeforerequest
    ],
  },
});

export const createBackendApiClient: typeof createHttpServer = (
  req,
  defaults = {}
) => {
  return createHttpServer(req, {
    ...httpOptions,
    ...defaults,
  });
};
