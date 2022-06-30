<template>
    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="media in medias" :key="media.id">
            <!-- carousel item inner -->
        </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
    props: {
        medias: {
            required: false,
            default: () => [],
            type: Array
        }
    }
}
</script>
