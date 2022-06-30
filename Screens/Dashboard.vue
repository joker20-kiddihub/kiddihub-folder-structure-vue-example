<template>
    <v-app>
        <AppDrawer :openned="drawerVisiable" @visiable="updateVisiable"/>
        <!--  -->
        <AppHeader @toggle-drawer="drawerVisiable=!drawerVisiable"/>
        <!-- Sizes your content based upon application components -->
        <v-main id="app-main">
            <!-- Provides the application the proper gutter -->
            <router-view></router-view>
            <!-- <v-footer app></v-footer> -->
        </v-main>
        
        <NotificationCenter :eventBus="$eventBus" :type="'success'" class="is-top-right" />
    </v-app>
</template>
<script>
import AppHeader from "../Shared/Components/Layouts/AppHeader.vue";
import AppDrawer from "../Shared/Components/Layouts/AppDrawer.vue";
import NotificationCenter from "@VueShare/Nofitier/Index.vue";
export default {
    components: { AppHeader, AppDrawer, NotificationCenter },
    data() {
        return {
            drawerVisiable: false
        }
    },
    methods: {
        updateVisiable (visiable) {
            this.drawerVisiable = visiable
        }
    }
}
</script>

