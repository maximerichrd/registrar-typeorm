// Definition of restricted import
// eslint-disable-next-line no-restricted-imports
import useSWRInfinite, {
  type SWRInfiniteConfiguration,
  type SWRInfiniteResponse,
} from 'swr/infinite';

export function useHttpInfinite<K extends readonly unknown[], D>(
  getKey: (index: number, previousPageData: D | null) => [...K] | null,
  fetcher: (args: [...K]) => D | Promise<D>,
  config?: SWRInfiniteConfiguration<D, Error>
): SWRInfiniteResponse<D, Error>;

export function useHttpInfinite<K extends string, D>(
  getKey: (index: number, previousPageData: D | null) => K | null,
  fetcher: (arg: K) => D | Promise<D>,
  config?: SWRInfiniteConfiguration<D, Error>
): SWRInfiniteResponse<D, Error>;

export function useHttpInfinite<K extends readonly unknown[], D>(
  getKey: (index: number, previousPageData: D | null) => [...K] | null,
  fetcher: (args: [...K]) => D | Promise<D>,
  config?: SWRInfiniteConfiguration<D, Error>
): SWRInfiniteResponse<D, Error> {
  return useSWRInfinite(getKey, fetcher, config);
}
