import { VStore } from "./prototype/VStore";
import { UTF8 } from "@support/UTF8.js";

const store = new VStore('/post', {
    beforeAdd: (post) => {
        post.title = UTF8.decode(post.title);
        post.content = UTF8.decode(post.content);
        post.categories.forEach(category => {
            category.name = UTF8.decode(category.name);
        });
        return post;
    }
});
export default store.export();
