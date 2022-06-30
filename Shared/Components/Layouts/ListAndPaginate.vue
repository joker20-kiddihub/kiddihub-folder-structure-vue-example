<template>
    <v-row class="ma-0">
        <!-- /Loader -->
        <v-col v-if="isLoading" cols="12" class="text-center">
            <v-progress-linear
                color="green darken-1 accent-4"
                indeterminate
                height="4"
            ></v-progress-linear>
        </v-col>
        <!--  -->
        <slot></slot>
        <!--  -->
        <slot name="notFound"></slot>
        <!-- /Paginator -->
        <v-col cols="12" class="text-center py-3" v-if="showPaginator">
            <v-pagination
                v-model="page"
                :length="paginator.pageCount"
                @input="$emit('input', page)"
                circle
            ></v-pagination>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        value: {
            required: false,
            type: Number
        },
        paginator: {
            required: false,
            type: Object
        },
        loading: {
            required: false,
            type: Boolean
        }
    },
    computed: {
        showPaginator() {
            return this.paginator.pageCount>1&&!this.isLoading
        }
    },
    watch: {
        loading(value) {
            this.isLoading = value;
        }
    },
    data() {
        return {
            page: this.value,
            isLoading: this.loading
        }
    }
}
</script>
