import { $auth } from "../Services/Auth";

export default {
    /**
     * Check if current user has ADMIN role
     * @param {NavigationGuardNext<Vue>} next
     */
    admin(next) {
        if (auth.isAdmin) return next();
    },
    /**
     * Check if current user has ADMIN||WRITER role
     * @param {NavigationGuardNext<Vue>} next
     */
    highRole(next) {
        if (auth.isHighRole) return next();
    },
    /**
     * Check if current user has ADMIN||WRITER||MANAGER role
     * @param {NavigationGuardNext<Vue>} next
     */
    manager(next) {
        if ($auth.isHighRole||$auth.isManager) return next();
    },
    /**
     * Check if current user has ADMIN||WRITER||SALER role
     * @param {NavigationGuardNext<Vue>} next
     */
    saler(next) {
        if ($auth.isHighRole||$auth.isSaler) return next();
    }
}
