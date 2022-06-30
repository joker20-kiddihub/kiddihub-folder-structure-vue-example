<template>
    <v-textarea v-model="content" :auto-grow="true" solo label="Nội dung" max-height="500"
        @input="$emit('input', content)" background-color="white" :rules="rules" :required="required"
        :error="error.state" :error-messages="error.messages">
        <template v-slot:prepend-inner>
            <Emojis @input="selectEmoji"></Emojis>
        </template>
    </v-textarea>
</template>
<script>
import Emojis from "./Emojis.vue";
import { insertByCursor } from "@support/Input.js";
export default {
    components: { Emojis },
    props: {
        value: {
            required: false,
            type: String,
            default: ''
        },
        required: {
            required: false,
            type: Boolean,
            default: false
        },
        rules: {
            required: false
        },
        errors: {
            required: false,
            type: Array,
            default: () => []
        }
    },
    watch: {
        value(value) {
            this.content = value;
        },
        errors(messages = []) {
            this.error = {state: messages.length, messages}
        }
    },
    methods: {
        selectEmoji (content) {
            insertByCursor(this.$el.querySelector('textarea'), content);
        }
    },
    data() {
        return {
            content: this.value,
            error: {
                state: this.errors.length > 0,
                messages: this.errors
            }
        }
    }
}
</script>
