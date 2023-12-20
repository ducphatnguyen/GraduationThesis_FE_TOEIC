import createApiClient from "./api.service";
class ExamService {
    constructor(baseUrl = "/api/exam") {
        this.api = createApiClient(baseUrl);
    }
    async getFullTest() {
        return (await this.api.get("/full-tests")).data;
    }
    async getMiniTest() {
        return (await this.api.get("/mini-tests")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async all() {
        return (await this.api.get("")).data;
    }
    async create(data) {
        return (await this.api.post("", data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async updateStatus(examId, newStatus) {
        return await this.api.put(`/${examId}/status`, newStatus);
    }
    async countTotalExams() {
        return (await this.api.get("/total")).data;
    }
}
export default new ExamService;