import createApiClient from "./api.service";
class ScoreTableService {
    constructor(baseUrl = "/api/score-table") {
        this.api = createApiClient(baseUrl);
    }
    async getListeningScores() {
        return (await this.api.get("/listening-scores")).data;
    }
    async getReadingScores() {
        return (await this.api.get("/reading-scores")).data;
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
}
export default new ScoreTableService;