<template>
    <v-card :disabled="updating" width="250" height="300" class="align-center" :loading="updating">
        <v-card-title class="pt-10 justify-center">
            <v-avatar class="my-3" size="100">
                <img :src="account.profile.image" :alt="account.profile.name">
            </v-avatar>
        </v-card-title>
        <v-card-subtitle class="text-center text-subtitle-2" v-html="account.profile.name"></v-card-subtitle>
        <v-card-actions class="justify-center">
            <v-btn depressed color="green" class="light--text" @click="updating=true">Cập nhật</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
    </v-card>
</template>
<script>
export default {
    props: {
        account: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            updating: false
        }
    }
}
</script>