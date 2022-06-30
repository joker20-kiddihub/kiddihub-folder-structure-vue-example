<template>
    <v-hover v-slot="{ hover }">
        <v-card class="p-3">
            <v-img :aspect-ratio="1" :src="media.thumbnail" :lazy-src="defaultThumbnail">
                <v-icon large color="red">{{ icon }}</v-icon>
            </v-img>
            <v-expand-transition>
                <v-overlay v-if="editMode&&hover" :absolute="true"
                    class="d-flex justify-center align-center transition-fast-in-fast-out">
                    <v-btn icon @click="$emit('delete')">
                        <v-icon color="white">mdi-delete-empty</v-icon>
                    </v-btn>
                </v-overlay>
            </v-expand-transition>
        </v-card>
    </v-hover>
</template>
<script>
import { TYPES } from "../../../Services/Media.js";
export default {
    props: {
        media: {
            required: true,
            type: Object
        },
        editable: {
            required: false,
            default: false,
            type: Boolean
        }
    },
    watch: {
        editable (value) {
            this.editMode = value;
        }
    },
    computed: {
        icon() {
            switch (this.media.type) {
                case TYPES.EMBED_VIDEO:
                    return 'mdi-youtube';
                    break;
                case TYPES.LINK:
                    return 'mdi-link';
                    break;
                default:
                    break;
            }
        }
    },
    data() {
        return {
            editMode: this.editable,
            defaultThumbnail: process.env.MIX_DEFAULT_IMG
        }
    }
}
</script>
