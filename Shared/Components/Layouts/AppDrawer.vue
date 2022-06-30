<template>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        @update:mini-variant="$emit('visiable', !mini)"
        color="green"
        permanent
        app
    >
        <v-list-item class="px-2">
            <v-list-item-avatar>
                <v-img :src="user.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-title v-html="user.username"></v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                :to="item.to"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    props: {
        openned: {
            required: false,
            default: false,
            type: Boolean
        }
    },
    watch: {
        openned(value) {
            this.mini = !value
        }
    },
    computed: {
        user() {
            return this.$auth.user
        }
    },
    data () {
        return {
            drawer: true,
            items: [
                { title: 'Home', icon: 'mdi-home-city', to: {name: 'index'} },
                // { title: 'My Account', icon: 'mdi-account', to: {name: ''} },
                // { title: 'Users', icon: 'mdi-account-group-outline', to: {name: ''} },
                { title: 'Social Posting', icon: 'mdi-microsoft-sharepoint', to: {name: 'post.list'} },
            ],
            mini: !this.openned
        }
    }
}
</script>