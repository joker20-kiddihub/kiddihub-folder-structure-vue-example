import { URLQuery } from "@support/URLQuery.js";
class Target {
    #origin = `${process.env.MIX_API_BASE}/v2`
    #query = null
    #url = ''
    /**
     * @param {String} path
     * @param {{}|null} query
     */
    constructor (path = '', query = null) {
        if (path.charAt(0)==='/') this.#url = `${this.#origin}${path}`
        else this.#url = path
        this.#query = query
    }
    export() {
        const query = this.#query===null ? '' : `?${URLQuery.encode(this.#query)}`
        return this.#url + query;
    }
}
class Headers {
    static common = {'Accept': 'application/json'}
    static json = {'Content-Type': 'application/json;charset=UTF-8'}
    static formData = {}
    constructor () {}
    /**
     * Make request headers
     * @param {'json'|'formData'} type
     */
    static produce(type) {
        return {...Headers.common, ...Headers[type]}
    }
    /**
     * Map request data to suitable headers
     * @param {FormData|{}|[]} data
     */
    static mapData(data) {
        if (data instanceof FormData) {
            return {body, headers: Headers.produce('formData')};
        }
        return {body: JSON.stringify(data), headers: Headers.produce('json')};
    }
    static set authorization(value = '') {
        Headers.common.Authorization = value
    }
}
class CRequest {
    #xhr = new XMLHttpRequest();
    #headers = {}
    #body = null
    /**
     * @param {(data,code:Number,message:String) => {}} onsuccess
     * @param {(data,code:Number,message:String) => {}} onerror
     */
    constructor (onsuccess, onerror, init = {responseType: 'json'}) {
        this.#xhr.withCredentials = true;
        this.#xhr.responseType = init.responseType;

        this.#xhr.onload = () => {
            if (this.#xhr.status===400) onerror(this.#xhr.response);
            else onsuccess(this.#xhr.response);
        };
        this.#xhr.error = () => {
            onerror({data: this.#xhr.response, code: 0, message: ''});
        }
    }
    headers(headers = {}) {
        this.#headers = {...this.#headers, ...headers}
        return this;
    }
    body(data) {
        this.#body = data;
        return this
    }
    create(method = 'GET', path = '/', query = null) {
        const uri = (new Target(path, query)).export();
        this.#xhr.open(method, uri, true);
        for (const key in this.#headers) {
            this.#xhr.setRequestHeader(key, this.#headers[key]);
        }
        return this.#xhr.send(this.#body);
    }
}
const Bee = {
    Headers,
    /**
     * Make GET request
     * @param {String} path Target of request
     * @param {{}|null} query Query params
     * @return {Promise<{data:Array|{}|Number|String|null,code:Number,message:String}>}
     */
    async get(path = '/', query = null) {
        return new Promise((resolve, reject) => {
            const request = new CRequest(resolve, reject);
            const { headers } = Headers.mapData();
            return request.headers(headers).create('GET', path, query);
        });
    },
    /**
     * Make POST request
     * @param {String} path Target of request
     * @param {{}|FormData} data Data to send
     * @param {{}|null} query Query params
     * @return {Promise<{data:Array|{}|Number|String|null,code:Number,message:String}>}
     */
    async post(path = '/', data, query = null) {
        return new Promise((resolve, reject) => {
            const request = new CRequest(resolve, reject);
            const { headers, body } = Headers.mapData(data);
            return request.headers(headers).body(body)
                .create('POST', path, query);
        });
    },
    /**
     * Make PUT request
     * @param {String} path Target of request
     * @param {{}|FormData} data Data to send
     * @param {{}|null} query Query params
     * @return {Promise<{data:Array|{}|Number|String|null,code:Number,message:String}>}
     */
    async put(path = '/', data, query = null) {
        return new Promise((resolve, reject) => {
            const request = new CRequest(resolve, reject);
            const { headers, body } = Headers.mapData(data);
            return request.headers(headers).body(body)
                .create('PUT', path, query);
        });
    },
    /**
     * Make DELETE request
     * @param {String} path Target of request
     * @param {{}|FormData} data Data to send
     * @param {{}|null} query Query params
     * @return {Promise<{data:Array|{}|Number|String|null,code:Number,message:String}>}
     */
    async delete(path = '/', data, query = null) {
        return new Promise((resolve, reject) => {
            const request = new CRequest(resolve, reject);
            const { headers, body } = Headers.mapData(data);
            return request.headers(headers).body(body)
                .create('DELETE', path, query);
        });
    },
    /**
     * Make Http request
     * @param {{path:String,method:'GET'|'POST'|'PUT'|'DELETE',data:object}} init
     * @return {Promise<{data:Array|{}|Number|String|null,code:Number,message:String}>}
     */
    async make(init = {path, method, data: {}}) {
        return await this[init.method.toLowerCase()](init.path, init.data);
    }
}
export { Bee }
