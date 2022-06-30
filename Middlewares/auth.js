import { $auth } from "../Services/Auth.js";

/**
 * Check if current user logged in
 * @param {NavigationGuardNext<Vue>} next
 */
export default function auth(next) {
    if ($auth.check) {
        return next();
    }
    return next({name: 'login'});
}