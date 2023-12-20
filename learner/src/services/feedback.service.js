import createApiClient from "./api.service";
class FeedbackService {
    constructor(baseUrl = "/api/feedback") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("", data)).data;
    }
    async all() {
        return (await this.api.get("")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async getFiveStarFeedbacks() {
        return (await this.api.get("/five-star")).data;
    }
}
export default new FeedbackService;