import { ComponentType, LazyExoticComponent, lazy } from 'react';

type LazyLoadReturn<T> =
  | LazyExoticComponent<ComponentType<T>>
  | Promise<{ default: T }>;

/**
 * Lazily loads a module from the given import path and either returns
 * a) the default export or
 * b) a given named export as default export.
 *
 * @param {string} importPath - The path of the module to be imported.
 * @param {string} namedExport - The name of the named export to be extracted from the module.
 * @return {LazyLoadReturn<any>} A promise that resolves to the extracted named export from the module.
 */
export const lazyLoad = <T = unknown>(
  importPath: string,
  namedExport?: string,
): LazyLoadReturn<T> =>
  lazy(() => {
    const promise = import(/* @vite-ignore */ importPath);
    /*
     * Vite can not resolve aliases in lazy imports and needs the file extension.
     * @see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
     */

    if (!namedExport) {
      return promise;
    }

    return promise.then((module: Record<string, T>) => ({
      default: module[namedExport],
    }));
  });
