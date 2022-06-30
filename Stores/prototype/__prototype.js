export function prototype() {
    return {
        namespaced: true,
        state: {
            records: [],
            paginator: { pageCount: 0, total: 0 }
        },
        getters: {
            all: state => state.records,
            paginator: state => state.paginator
        },
        mutations: {
            add: (state, record) => state.records.push(record),
            paginator(state, params) {
                state.paginator = { ...state.paginator, ...params }
            },
            delete(state, id) {
                state.records = state.records.filter(item => item.id !== id)
            }
        },
        actions: {}
    }
}
