/** components */
import Login from "../Screens/Auth/Login.vue";
/** middleware */
import guest from "../Middlewares/guest";

export default [
    {path: "/dang-nhap", name: "login", component: Login, meta: {middleware: guest}}
]
