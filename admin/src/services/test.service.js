import createApiClient from "./api.service";

class TestService {
    constructor(baseUrl = "/api/test") {
        this.api = createApiClient(baseUrl);
    }
    async create(sectionId, data) {
        data.sectionId = sectionId;
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
    async getTestsBySection(sectionId) {
        return (await this.api.get(`/by-section/${sectionId}`)).data;
    }
    async updateStatus(testId, newStatus) {
        return await this.api.put(`/${testId}/status`, newStatus);
    }
    async addOrUpdateQuestionToTest(id, data) {
        return (await this.api.put(`/${id}/add-questions`, data)).data;
    }
    async getQuestionsByTestId(testId) {
        return (await this.api.get(`${testId}/questions`)).data;
    }
}

export default new TestService();
