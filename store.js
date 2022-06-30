import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import post from "./Stores/Post.js";
import postCategory from "./Stores/PostCategory.js";

export const store = new Vuex.Store({
    modules: {
        post,
        postCategory
    }
});
