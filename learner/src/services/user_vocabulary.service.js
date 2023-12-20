import createApiClient from "./api.service";
class UserVocabularyService {
    constructor(baseUrl = "/api/user-vocabulary") {
        this.api = createApiClient(baseUrl);
    }
    async createUserVocabulary(data) {
        return (await this.api.post("", data)).data;
    }
    async getUserVocabulariesByVocabularyIdAndUserId(vocabularyId, userId) {
        return (await this.api.get(`/user-vocabularies/${vocabularyId}/${userId}`)).data;
    }
    async getUserVocabulariesByUserId(userId) {
        return (await this.api.get(`/user-vocabularies/${userId}`)).data;
    }
    async deleteUserVocabularyByVocabularyId(vocabularyId, userId) {
        console.log("vocabularyId", vocabularyId)
        console.log("userId", userId)
        return (await this.api.delete(`/${vocabularyId}/${userId}`)).data;
    }

}
export default new UserVocabularyService;