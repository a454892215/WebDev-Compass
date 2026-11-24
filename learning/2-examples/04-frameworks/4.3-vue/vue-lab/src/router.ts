import { createRouter, createWebHistory, type RouterHistory } from "vue-router";
export function makeRouter(history: RouterHistory = createWebHistory()) {
  const router = createRouter({
    history,
    routes: [
      { path: "/", component: () => import("./pages/Playground.vue") },
      { path: "/items/:id", component: () => import("./pages/Detail.vue") },
      {
        path: "/restricted",
        component: () => import("./pages/Detail.vue"),
        meta: { requiresDemoAccess: true },
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("./pages/NotFound.vue"),
      },
    ],
  });
  // Demonstrates UX navigation only, never authorizes a real API.
  router.beforeEach((to) =>
    to.meta.requiresDemoAccess ? { path: "/", query: { denied: "1" } } : true,
  );
  return router;
}
