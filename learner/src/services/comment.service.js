import createApiClient from "./api.service";
class CommentService {
    constructor(baseUrl = "/api/comments") {
        this.api = createApiClient(baseUrl);
    }

    async createComment(data) {
        console.log(data)
        return (await this.api.post("", data)).data;
    }
    async getAllComments() {
        return (await this.api.get("")).data;
    }
    async getUserComments(userId) {
        return (await this.api.get(`/user/${userId}/rootComments`)).data;
    }
}
export default new CommentService;