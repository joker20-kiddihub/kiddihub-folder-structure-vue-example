/** components */
import Index from "../../Screens/SocialAccount/Index";
import List from "../../Screens/SocialAccount/List.vue";
/** middleware */
import role from "../../Middlewares/role.js";

export default [
    {
        path: "social-account", component: Index, children: [
            {path: "", component: List, name: 'social-account.list', meta: {middleware: role.manager}}
        ]
    }
]
