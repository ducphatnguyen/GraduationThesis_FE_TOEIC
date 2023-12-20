import createApiClient from "./api.service";

class LessonService {
    constructor(baseUrl = "/api/lesson") {
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

    async getLessonsBySection(sectionId) {
        return (await this.api.get(`/by-section/${sectionId}`)).data;
    }

    async getEnableLessonsBySection(sectionId) {
        return (await this.api.get(`/by-section/${sectionId}/enable`)).data;
    }

    async updateStatus(lessonId, newStatus) {
        return await this.api.put(`/${lessonId}/status`, newStatus);
    }

    async getLessonNameById(lessonId) {
        return (await this.api.get(`/${lessonId}/name`)).data;
    }

}

export default new LessonService();
