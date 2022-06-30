import Vue from "vue";
import VueRouter from "vue-router";

import auth from "./Routes/auth.js";
import main from "./Routes/main.js";

Vue.use(VueRouter);

const routes = [...auth, ...main];

const router = new VueRouter({
    mode: "history",
    base: 'v3',
    routes
});

router.beforeEach(function (to, from, next) {
    if (to.meta.middleware!==undefined) {
        return to.meta.middleware(next);
    }
    return next();
});
export { router }
