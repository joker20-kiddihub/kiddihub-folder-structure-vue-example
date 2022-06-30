/** components */
import Index from "../../Screens/Post/Index.vue";
import List from "../../Screens/Post/List.vue";
import Create from "../../Screens/Post/Create.vue";
/** middleware */
import role from "../../Middlewares/role.js";

export default [
    {
        path: "post", component: Index, children: [
            {path: "", component: List, name: 'post.list', meta: {middleware: role.manager}},
            {path: "create", component: Create, name: 'post.create', meta: {middleware: role.manager}}
        ]
    }
]
