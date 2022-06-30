<template>
    <v-menu v-model="visiable" transition="scroll-y-transition">
        <template v-slot:activator="{ on, attrs }">
            <v-btn ref="toggle" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-youtube</v-icon>
            </v-btn>
        </template>
        <v-card @click.stop min-width="320">
            <v-form @submit.prevent="getMedias" class="px-2 pt-2">
                <v-progress-linear
                    indeterminate
                    color="green darken-1"
                    class="mb-2"
                    v-if="loading"
                ></v-progress-linear>
                <v-text-field
                    v-model="url"
                    label="Youtube url"
                    placeholder="VD: https://www.youtube.com/watch?v=WiH6KR7GLR4"
                    :error-message="error.message"
                    :error="error.status"
                    outlined
                    dense
                    :disabled="loading"
                    append-icon="mdi-youtube"
                ></v-text-field>
            </v-form>
        </v-card>
    </v-menu>
</template>
<script>
import { fromYoutube } from "../../../../Services/Media.js";
export default {
    data () {
        return {
            error: { status: false, message: 'Vui lòng kiểm tra lại đường dẫn' },
            loading: false,
            visiable: false,
            url: ''
        }
    },
    methods: {
        async getMedias() {
            this.loading = true;
            try {
                const media = await fromYoutube(this.url);
                this.$emit('input', [media]);
                this.error.status = false;
                this.visiable = false;
                this.url = '';
            } catch (error) {
                this.error.status = true
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>
