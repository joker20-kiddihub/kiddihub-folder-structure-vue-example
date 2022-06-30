<template>
    <v-btn icon @click="$refs.images.click()">
        <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
            size="24"
        ></v-progress-circular>
        <v-icon v-else>mdi-image-plus</v-icon>
        <input type="file" accept="image/*" ref="images" class="d-none" multiple @input="getMedias">
    </v-btn>
</template>
<script>
import { fromFiles } from "../../../../Services/Media.js";
export default {
    methods: {
        async getMedias(e) {
            this.loading = true;
            const medias = await fromFiles(e.target.files);
            this.$emit('input', medias);
            this.loading = false;
        }
    },
    data() {
        return {
            loading: false
        }
    }
}
</script>
