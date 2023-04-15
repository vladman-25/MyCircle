export default class Auth {
    static authenticateUser(token) {
        localStorage.setItem("token", token);
    }

    static isUserAuthenticated() {
        return ((localStorage.getItem("token") !== null) && (typeof(localStorage.getItem("token")) !== undefined));
    }

    static deauthenticateUser() {
        localStorage.removeItem("token");
    }

    static getToken() {
        return localStorage.getItem("token");
    }
}