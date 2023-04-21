// Definition of restricted import
// eslint-disable-next-line no-restricted-imports
import useSWR, { type SWRConfiguration, type SWRResponse } from 'swr';

export function useHttp<K extends readonly unknown[], D>(
  key: [...K] | (() => [...K] | null) | null,
  fn: (args: [...K]) => D | Promise<D>,
  config?: SWRConfiguration<D, Error>
): SWRResponse<D, Error>;

export function useHttp<K extends string, D>(
  key: K | (() => K | null) | null,
  fn: (arg: K) => D | Promise<D>,
  config?: SWRConfiguration<D, Error>
): SWRResponse<D, Error>;

export function useHttp<K extends readonly unknown[], D>(
  key: [...K] | (() => [...K] | null) | null,
  fn: (args: [...K]) => D | Promise<D>,
  config?: SWRConfiguration<D, Error>
): SWRResponse<D, Error> {
  return useSWR(key, fn, config);
}
