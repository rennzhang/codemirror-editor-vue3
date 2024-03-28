import { resolve } from "path";

export function pathResolve(dir: string) {
  return import.meta.glob(`.${dir}`)[dir];
}
export default "";
