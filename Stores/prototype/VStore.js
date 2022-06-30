import { prototype } from "./__prototype.js";
import { actions } from "./actions.js";

let VStore = function (base = '', methods = {}, defaults = []) {
    this.methods = {...{
        beforeAdd: (record, context = {}) => record,
        afterStore: (record, context = {}) => record
    }, ...methods};

    const self = prototype();
    self.actions = {...self.actions, ...actions(base, this.methods.afterStore, this.methods.beforeAdd)}

    /**
     * Add one more state
     * @param {String} name
     * @param {*} state
     */
    this.state = function (name, state) {
        self.state[name] = state
    }
    /**
     * Add one more getter
     * @param {String} name
     * @param {Function} getter
     */
    this.getter = function (name, getter) {
        self.getters[name] = getter
    }
    /**
     * Add one more mutation
     * @param {String} name
     * @param {Function} mutation
     */
    this.mutation = function (name, mutation) {
        self.mutations[name] = mutation
    }
    /**
     * Add one more action
     * @param {String} name
     * @param {Function} action
     */
    this.action = function (name, action) {
        self.actions[name] = action
    }
    self.state.records = defaults.map(record => {
        return this.methods.beforeAdd(record)
    });

    this.export = () => self
}
export { VStore }
