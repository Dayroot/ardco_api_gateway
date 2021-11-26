import { RESTDataSource } from "apollo-datasource-rest";
import serverConfig from '../server.js';

class AuthAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.auth_api_url;
    }
    // Create a new User
    async createUser( user ){
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post(`/user/`, user);
    }

    // Get a data of a specific user
    async getUser(userId) {
        return await this.get(`/user/${userId}`);
    }

    // Delete a user
    async deleteUser(userId) {
        return await this.delete(`/user/${userId}`);
    }

    //Login
    async authRequest(credentials) {
        credentials = new Object(JSON.parse(JSON.stringify(credentials)));
        return await this.post(`/login/`, credentials);
    }

    // Update a data of a specific user
    async updateUser(userId, data) {
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.put(`/user/${userId}`, data);
    }

    // Regenerated an expired token
    async refreshToken(token) {
        token = new Object(JSON.parse(JSON.stringify({ refresh: token })));
        return await this.post(`/refresh/`, token);
    }
}

export default AuthAPI;