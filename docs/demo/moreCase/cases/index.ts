
export const cases: Record<
  string,
  {
    path: string;
    name: string;
    compRaw: () => Promise<unknown>;
    component: () => Promise<typeof import("*.vue")>;
  }
> = {};

export const rawModules = import.meta.glob("./*.vue", {
  query: "?raw",
});
Object.entries(rawModules).forEach(async ([path, getValue]) => {
  const name = path.match(/\.\/(.*)\.vue/)?.[1];
  console.log(" name", await getValue());
  const compRawMoudle = await getValue();
  console.log(" compRawMoudle", compRawMoudle);
  if (name) {
    cases[name] = {
      path,
      name,
      compRaw: getValue,
      component: () => import(`./${name}.vue`),
    };
  }
});
console.log(" cases", cases);

// console.log(jsraw);

// console.log(modules[".js.vue"]);
