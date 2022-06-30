<template>
    <Item>
        <v-img :aspect-ratio="16/10" :src="media.thumbnail" :lazy-src="defaultThumbnail"></v-img>
        <v-card-subtitle class="py-2">{{ hostName }}</v-card-subtitle>
        <v-card-text class="pt-0 pb-2">
            <a :href="media.src" class="text-h6 green--text" v-html="media.title" style="line-height: 1.1rem"></a>
            <TextOverflow :visiable-line="2" v-html="media.description" class="pt-1"></TextOverflow>
        </v-card-text>
    </Item>
</template>
<script>
import Item from "../Item.vue";
import TextOverflow from "@VueShare/TextOverflow/Index.vue";
import { TYPES } from "../../../../Services/Media.js";
export default {
    type: TYPES.LINK,
    components: { Item, TextOverflow },
    props: {
        media: {
            required: true,
            type: Object
        }
    },
    computed: {
        hostName() {
            return (new URL(this.media.src)).hostname.toUpperCase();
        }
    },
    data() {
        return {
            defaultThumbnail: process.env.MIX_DEFAULT_IMG,

        }
    }
}
</script>
