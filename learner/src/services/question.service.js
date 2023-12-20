import createApiClient from "./api.service";
class QuestionService {
    constructor(baseUrl = "/api/question") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    }
    async all() {
        return (await this.api.get("")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async updateStatus(questionId, newStatus) {
        return await this.api.put(`/${questionId}/status`, newStatus);
    }
    async getQuestionsByTest(testId) {
        return (await this.api.get(`/by-test/${testId}`)).data;
    }
    async getQuestionsBySectionIdAndType(data) {
        return (await this.api.post("/by-section-and-type", data)).data;
    }
}
export default new QuestionService;