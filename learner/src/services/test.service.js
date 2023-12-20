import createApiClient from "./api.service";

class TestService {
    constructor(baseUrl = "/api/test") {
        this.api = createApiClient(baseUrl);
    }

    async create(sectionId, data) {
        // Thêm thông tin của phần vào đối tượng data
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

    async getEnableTestsBySection(sectionId) {
        return (await this.api.get(`/by-section/${sectionId}/enable`)).data;
    }

    async updateStatus(testId, newStatus) {
        return await this.api.put(`/${testId}/status`, newStatus);
    }

    async getQuestionsByTestId(testId) {
        return (await this.api.get(`${testId}/questions`)).data;
    }

    async getTestNameById(testId) {
        return (await this.api.get(`/${testId}/name`)).data;
    }
}

export default new TestService();
