import createApiClient from "./api.service";

class SectionService {
    constructor(baseUrl = "/api/section") {
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

    async allEnable() {
        return (await this.api.get("/enable")).data;
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

    async updateStatus(sectionId, newStatus) {
        return await this.api.put(`/${sectionId}/status`, newStatus);
    }

    async getSectionNameById(sectionId) {
        return (await this.api.get(`/${sectionId}/name`)).data;
    }

}

export default new SectionService();
