import __cnf from "@config/auth.js";
import { Passport } from "./Passport.js";
import { Bee } from "./Bee.js";
import { UTF8 } from "@support/UTF8.js";

class Auth {
    #user = null
    constructor () {}
    /**
     * Get current user
     * @return {{id:Number,username:String,email:String,phone:String,role:Number,team:{leader_id:Number},schools:[{id:Number,name:String}]}}
     */
    get user() {
        return this.#user
    }
    /**
     * Check if authorized
     * @return {Boolean}
     */
    get check() {
        return Passport.valid
    }
    get isAdmin () {
        return this.check&&__cnf.roles!==null&&this.user.role===__cnf.roles.admin
    }
    get isWriter () {
        return this.check&&__cnf.roles!==null&&this.user.role===__cnf.roles.writer
    }
    get isManager () {
        return this.check&&__cnf.roles!==null&&this.user.role===__cnf.roles.manager
    }
    get isSaler () {
        return this.check&&__cnf.roles!==null&&this.user.role===__cnf.roles.saler
    }
    get noRole () {
        return this.check&&__cnf.roles!==null&&this.user.role===__cnf.roles.guest
    }
    get isLeader () {
        return this.user.team!==null&&this.user.team.leader_id===this.user.id
    }
    get isHighRole () {
        return this.isAdmin||this.isWriter
    }
    get schools() {
        return this.user.schools
    }
    /**
     * On Auth created
     * @param {($auth: Auth) => {}} onCreated
     */
    async created(onCreated) {
        try {
            const { data } = await Bee.get('/account');
            if (data.team) data.team.name = UTF8.decode(data.team.name);
            this.#user = data;
        } finally {
            return onCreated(this)
        }
    }
    /**
     * Make a login request
     * @param {{username:String,password:String}} credentials
     * @param {String[]|null} scopes
     */
    async login(credentials = {username, password}, scopes = null) {
        const params = Array.isArray(scopes) ? {...credentials, ...{scopes}} : credentials;
        const { data = {access_token, refresh_token, expires_in, token_type} } = await Bee.post('/login', params);
        Passport.set(data);
        Bee.Headers.authorization = Passport.authorization;
    }
    /**
     * Make a refresh token request
     * @param {String[]|null} scopes
     */
    async refresh(scopes = null) {
        let params = {refresh_token: Passport.refreshToken}
        params = Array.isArray(scopes) ? {...params, ...{scopes}} : params;
        const { data } = await Bee.post('/refresh-token', params);
        Passport.set(data);
    }
    /**
     * Make a logout request
     */
    async logout() {
        await Bee.post('/logout');
        Bee.Headers.authorization = '';
        Passport.clear();
    }
}
const $auth = new Auth();

Bee.Headers.authorization = Passport.authorization

export { $auth }
