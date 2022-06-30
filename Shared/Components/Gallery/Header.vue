<template>
    <v-toolbar class="mb-2" flat>
        <v-toolbar-title>Ảnh & Video</v-toolbar-title>
        <!--  -->
        <v-spacer></v-spacer>
        <!--  -->
        <v-btn v-if="!isDisabled&&!editMode" text small rounded class="py-1"
            @click="$emit('update:edit-mode', true)">Chọn</v-btn>
        <v-btn v-if="!isDisabled&&editMode" color="red" text small rounded class="py-1"
            @click="$emit('update:edit-mode', false)">Hủy chọn</v-btn>
        <!--  -->
        <ImagesInput v-if="!isDisabled" @input="inputMedia"></ImagesInput>
        <!--  -->
        <LinkInput v-if="!isDisabled" @input="inputMedia"></LinkInput>
    </v-toolbar>
</template>
<script>
import ImagesInput from "../Media/Input/Image.vue";
import LinkInput from "../Media/Input/Link.vue";
export default {
    components: { ImagesInput, LinkInput },
    props: {
        editable: {
            required: false,
            default: false,
            type: Boolean
        },
        disabled: {
            required: false,
            type: Boolean,
            default: false
        }
    },
    watch: {
        value (medias) {
            this.medias = medias
        },
        disabled (value) {
            this.isDisabled = value;
        },
        editable(value) {
            this.editMode = value
        }
    },
    data() {
        return {
            editMode: this.editable,
            isDisabled: this.disabled
        }
    },
    methods: {
        inputMedia(medias = []) {
            this.$emit('medias', medias);
        }
    }
}
</script>