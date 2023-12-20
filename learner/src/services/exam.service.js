import createApiClient from "./api.service";
class ExamService {
    constructor(baseUrl = "/api/exam") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("", data)).data;
    }
    async all() {
        return (await this.api.get("")).data;
    }
    async getFullTest() {
        return (await this.api.get("/full-tests")).data;
    }
    async getEnableFullTest() {
        return (await this.api.get("/full-tests/enable")).data;
    }

    async getMiniTest() {
        return (await this.api.get("/mini-tests")).data;
    }
    async getExamById(id) {
        return (await this.api.get(`/${id}`)).data;
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


}
export default new ExamService;