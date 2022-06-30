<template>
    <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon absolute :right="true" :top="true" v-bind="attrs" v-on="on" style="z-index: 2">
                <v-icon>mdi-emoticon-outline</v-icon>
            </v-btn>
        </template>
        <div @click.stop>
            <VEmojiPicker @select="selectEmoji" @click.stop/>
        </div>
    </v-menu>
</template>
<script>
import { VEmojiPicker } from 'v-emoji-picker';
export default {
    components: { VEmojiPicker },
    methods: {
        selectEmoji({ data }) {
            this.$emit('input', data)
        }
    }
}
</script>
