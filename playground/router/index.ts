import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  // ...
  routes,
  history: createWebHashHistory()
});

export { routes };
export default router;
