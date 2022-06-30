<template>
    <Item>
        <v-img :aspect-ratio="1" :src="media.thumbnail" :lazy-src="defaultThumbnail"></v-img>
    </Item>
</template>
<script>
import Item from "../Item.vue";
import { TYPES } from "../../../../Services/Media.js";
export default {
    type: TYPES.IMAGE,
    components: { Item },
    props: {
        media: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            defaultThumbnail: process.env.MIX_DEFAULT_IMG
        }
    }
}
</script>
