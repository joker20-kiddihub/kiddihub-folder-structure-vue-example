import Vue from 'vue'
import Vuetify from 'vuetify'
import __colors from '@config/colors.js';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const options = {
    theme: {
        themes: {
            light: {
                primary: __colors.blue,
                blue: __colors.blue,
                success: __colors.green,
                green: __colors.green,
                error: __colors.red,
                red: __colors.red,
                orange: __colors.orange,
                warning: __colors.orange,
                indigo: __colors.indigo,
                purple: __colors.purple,
                pink: __colors.pink,
                yellow: __colors.yellow,
                teal: __colors.teal,
                cyan: __colors.cyan,
                light: __colors.light,
                white: __colors.white,
                grey: __colors.grey,
                dark: __colors.dark,
            }
        }
    },
    options: { customProperties: true }
}

export default new Vuetify(options);