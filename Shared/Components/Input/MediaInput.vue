<template>
    <v-card class="mx-auto pb-3 mb-6" solo>
        <GalleryHeader @medias="inputMedias" :editable="editMode"
            @update:edit-mode="updateEditMode" :disabled="isDisabled"></GalleryHeader>
        <!--  -->
        <draggable v-model="medias" @input="$emit('input', medias)" class="row mx-0">
            <v-col v-for="media in medias" :key="media.id"
                class="d-flex child-flex pa-1" cols="6" sm="4" md="3">
                <GalleryItem :media="media" :editable="editMode" @delete="remove(media.id)"/>
            </v-col>
        </draggable>
        <!--  -->
        <EmptyHolder v-if="medias.length===0"></EmptyHolder>
    </v-card>
</template>
<script>
import Draggable from 'vuedraggable'
import GalleryHeader from "../Gallery/Header.vue"
import EmptyHolder from "../Gallery/EmptyHolder.vue";
import GalleryItem from "../Gallery/Item.vue";
export default {
    components: { Draggable, GalleryHeader, EmptyHolder, GalleryItem },
    props: {
        value: {
            required: false,
            default: () => [],
            type: Array
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
        }
    },
    data () {
        return {
            medias: this.value,
            isDisabled: this.disabled,
            editMode: false,
            files: []
        }
    },
    methods: {
        inputMedias (medias = []) {
            this.$emit('input', [...this.medias, ...medias]);
        },
        remove(id) {
            this.$emit('input', this.medias.filter(media => media.id!==id));
        },
        updateEditMode(state) {
            this.editMode = state;
        }
    }
}
</script>
