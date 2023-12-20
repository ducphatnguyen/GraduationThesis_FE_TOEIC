import createApiClient from "./api.service";
class GrammarQuestionService {
    constructor(baseUrl = "/api/grammar-question") {
        this.api = createApiClient(baseUrl);
    }
    async create(grammarId, data) {
        data.grammarId = grammarId;
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
    async getGrammarQuestionsByGrammar(grammarId) {
        return (await this.api.get(`/by-grammar/${grammarId}`)).data;
    }
    async getEnableGrammarQuestionsByGrammar(grammarId) {
        return (await this.api.get(`/by-grammar/${grammarId}/enable`)).data;
    }
}
export default new GrammarQuestionService;