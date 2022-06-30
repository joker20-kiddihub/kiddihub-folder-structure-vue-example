import { Bee } from "../../Services/Bee.js";

export function actions(base = '', afterStore = (data, context = {}) => {}, beforeAdd = (data, context = {}) => {}) {
    return {
        /**
         * Get all records
         * @param {{state:{},commit:(name:String,data),dispatch:(name:String,data)}} context
         * @param {{}} params Query params
         */
        async index(context = { dispatch }, params = {}) {
            const { data } = await Bee.get(base, params);
            context.dispatch('addAll', data);
        },
        /**
         * List paginate records
         * @param {{state:{},commit:(name:String,data),dispatch:(name:String,data)}} context
         * @param {{}} params Query params
         */
        async list(context = { commit, dispatch }, params = {}) {
            const { data = { last_page, total, data } } = await Bee.get(`${base}/list`, params);
            context.commit('paginator', { pageCount: data.last_page, total: data.total });
            context.dispatch('addAll', data.data);
        },
        /**
         * List paginate records
         * @param {{state:{},commit:(name:String,data),dispatch:(name:String,data)}} context
         * @param {String|Number} id
         */
        async show(context = { dispatch }, id) {
            const { data } = await Bee.get(`${base}/${id}`);
            context.dispatch('add', data);
        },
        /**
         * Create a new record
         * @param {{state:{},commit:(name:String,data),dispatch:(name:String,data)}} context
         * @param {*} params
         */
        async store(context = { state, commit, dispatch }, params) {
            const { data } = await Bee.post(base, params);
            afterStore(data, context);
            return data;
        },
        /**
         * Update a record by id
         * @param {{state:{},commit:(name:String,data),dispatch:(name:String,data)}} context
         */
        async update(context = { dispatch }, { id, params }) {
            const { data } = await Bee.put(`${base}/${id}`, params);
            return data;
        },
        /**
         * Delete a record by id
         * @param {{state:{},commit:(name:String,data),dispatch:(name:String,data)}} context
         */
        async delete(context = { commit }, { id, params }) {
            const { data } = await Bee.delete(`${base}/${id}`, params);
            context.commit('delete', id);
            return data;
        },
        /**
         * Add all records
         * @param {{state:{},dispatch:(name:String,data)}} context
         */
        addAll(context = { state, dispatch }, records = []) {
            context.state.records = []
            records.forEach(record => context.dispatch('add', record))
        },
        /**
         * Add all records
         * @param {{state:{},commit:(name:String,data),dispatch:(name:String,data),rootGetters:(name:String,data)}} context
         */
        add(context = { state, commit, dispatch, rootGetters }, record) {
            context.commit('add', beforeAdd(record, context))
        }
    }
}