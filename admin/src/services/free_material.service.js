import createApiClient from "./api.service";
class FreeMaterialService {
    constructor(baseUrl = "/api/free-material") {
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
    async updateStatus(materialId, newStatus) {
        return await this.api.put(`/${materialId}/status`, newStatus);
    }
    async countTotalFreeMaterials() {
        return (await this.api.get("/total")).data;
    }
}
export default new FreeMaterialService;