<template>
    <Item>
        <v-card-text class="py-3">
            <a :href="media.src">{{ media.src }}</a>
        </v-card-text>
        <v-img :aspect-ratio="16/10" :src="media.thumbnail" :lazy-src="defaultThumbnail">
            <v-overlay :absolute="true" class="d-flex justify-center align-center">
                <v-icon size="60" color="white">mdi-youtube</v-icon>
            </v-overlay>
        </v-img>
    </Item>
</template>
<script>
import Item from "../Item.vue";
import { TYPES } from "../../../../Services/Media.js";
export default {
    type: TYPES.EMBED_VIDEO,
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
