<template>
    <v-card width="250" height="300" class="d-flex justify-center align-center">
        <div>
            <v-btn x-large color="green" icon>
                <v-icon x-large>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon>
                <FacebookIcon/>
            </v-btn>
            <v-btn icon>
                <GoogleIcon/>
            </v-btn>
            <v-btn icon>
                <ZaloIcon/>
            </v-btn>
        </div>
    </v-card>
</template>
<script>
import FacebookIcon from "./Providers/Facebook.vue";
import GoogleIcon from "./Providers/Google.vue";
import ZaloIcon from "./Providers/Zalo.vue";
export default {
    components: { FacebookIcon, GoogleIcon, ZaloIcon }
}
</script>