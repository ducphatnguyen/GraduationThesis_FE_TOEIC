import createApiClient from "./api.service";
class VocabularyQuestionService {
    constructor(baseUrl = "/api/vocabulary-question") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
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
    async getVocabularyQuestionsByTopic(topicId) {
        return (await this.api.get(`/by-topic/${topicId}`)).data;
    }
    async getEnableVocabularyQuestionsByTopic(topicId) {
        return (await this.api.get(`/by-topic/${topicId}/enable`)).data;
    }
    async updateStatus(questionId, newStatus) {
        return await this.api.put(`/${questionId}/status`, newStatus);
    }
    
}
export default new VocabularyQuestionService;