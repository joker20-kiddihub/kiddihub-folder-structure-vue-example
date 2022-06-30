import { $auth } from "../Services/Auth.js";
/**
 * Check if current user not logged in
 * @param {NavigationGuardNext<Vue>} next
 */
export default function guest(next) {
    if (!$auth.check) {
        return next();
    }
}