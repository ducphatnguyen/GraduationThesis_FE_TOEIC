import createApiClient from "./api.service";
class UserGoalService {
    constructor(baseUrl = "/api/user-goal") {
        this.api = createApiClient(baseUrl);
    }
    async createUserGoal(data) {
        return (await this.api.post("", data)).data;
    }
    async getUserGoalByUserId(userId) {
        return (await this.api.get(`/by-user/${userId}`)).data;
    }
    async hasUserGoalWithUserId(userId) {
        return (await this.api.get(`/has-user-goal/${userId}`)).data;
    }
    async updateUserGoalByUserId(userId, data) {
        return (await this.api.put(`/${userId}`, data)).data;
    }

}
export default new UserGoalService;