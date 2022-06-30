<template>
    <v-hover v-slot="{ hover }">
        <v-card class="p-3">
            <slot></slot>
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
export default {
    props: {
        editable: {
            required: false,
            default: false,
            type: Boolean
        }
    },
    watch: {
        editable(value) {
            this.editMode = value;
        }
    },
    data() {
        return {
            editMode: this.editable
        }
    }
}
</script>