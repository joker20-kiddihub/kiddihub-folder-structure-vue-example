import { JStorage } from "@support/JStorage.js";
import __cnf from "@config/auth.js";

let passport = JStorage.get(__cnf.passport.storage_name);
passport = passport===null ? {access_token: '', refresh_token: '', expire_at: 0, token_type: 'Bearer'}: passport;

class Passport {
    constructor() {}
    static get accessToken() {
        return passport.access_token
    }
    static get refreshToken() {
        return passport.refresh_token
    }
    static get tokenType() {
        return passport.token_type
    }
    static get valid() {
        return !Passport.expired&&Passport.accessToken!==''
    }
    static get expired() {
        return (new Date()).getTime() > passport.expire_at
    }
    static set({access_token, refresh_token, expires_in, token_type}) {
        const expire_at = (new Date()).getTime() + expires_in * 1000
        passport = {access_token, refresh_token, expire_at, token_type}
        JStorage.store(__cnf.passport.storage_name, passport);
    }
    static clear() {
        JStorage.delete(__cnf.passport.storage_name);
        passport = {access_token: '', refresh_token: '', expire_at: 0, token_type: 'Bearer'}
    }
    static get authorization() {
        return passport.token_type + ' ' + passport.access_token
    }
}
export { Passport }
