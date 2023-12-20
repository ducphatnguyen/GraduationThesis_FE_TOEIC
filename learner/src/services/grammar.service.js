import createApiClient from "./api.service";
class GrammarService {
    constructor(baseUrl = "/api/grammar") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("", data)).data;
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
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getGrammarNameById(grammarId) {
        return (await this.api.get(`/${grammarId}/name`)).data;
    }
}
export default new GrammarService;