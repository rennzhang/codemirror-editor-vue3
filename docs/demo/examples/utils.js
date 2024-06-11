export function pathResolve(dir) {
    return import.meta.glob(`.${dir}`)[dir];
}
export default "";
