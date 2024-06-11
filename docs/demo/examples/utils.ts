export function pathResolve(dir: string) {
  return import.meta.glob(`.${dir}`)[dir]
}
export default ""
