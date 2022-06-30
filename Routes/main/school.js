/** components */
/** middleware */
import role from "../Middlewares/role.js";
export default [
    {path: "/truong", component: School, children: [
        {path: "", name: "school.list", component: SchoolList},
        {path: "them", name: "school.create", component: SchoolCreate, meta: {middleware: role.highRole}},
        {path: "trich-xuat", name: "school.export", component: SchoolExport, meta: {middleware: role.highRole}},
    ]}
];
