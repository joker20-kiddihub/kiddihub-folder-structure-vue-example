/** components */
import Dashboard from "../Screens/Dashboard.vue";
/** middleware */
import auth from "../Middlewares/auth";
/** sub-routes */
import post from "./main/post";
import socialAccount from "./main/socialAccount";

export default [
    {
        path: "/", name: "index", component: Dashboard, children: [
            ...post, ...socialAccount
        ], meta: {middleware: auth}
    }
];
