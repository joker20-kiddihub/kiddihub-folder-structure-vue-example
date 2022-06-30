import { VStore } from "./prototype/VStore";
import { UTF8 } from "@support/UTF8.js";

const store = new VStore('/post-category', {
    beforeAdd: (postCategory) => {
        postCategory.name = UTF8.decode(postCategory.name);
        return postCategory;
    }
});

export default store.export();
