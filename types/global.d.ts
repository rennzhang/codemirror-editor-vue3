import { JSHINT } from "@types/jshint"

/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
declare global {
  /**
   * Window 的类型提示
   */
  interface Window {
    JSHINT: JSHINT;
    jsonlint:any

  }


  type Nullable<T> = T | null;

  type Recordable<T = {}> = T & Record<string, any>;

  type Fn<T = any, R = T> = (...arg: T[]) => R;
}
