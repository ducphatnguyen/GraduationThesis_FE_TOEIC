import createApiClient from "./api.service";
class UserExamQuestionService {
    constructor(baseUrl = "/api/user-exam-questions") {
        this.api = createApiClient(baseUrl);
    }
    async submitAllUserExamQuestions(data) {
        console.log(data)
        return (await this.api.post("/submit-all", data)).data;
    }
    async getAll() {
        return (await this.api.get("")).data;
    }
    async getQuestionsByUserExamId(userExamId) {
        return (await this.api.get(`/by-user-exam/${userExamId}`)).data;
    }
    async getQuestionsByUserExamIdGroupedByType(userExamId) {
        return (await this.api.get(`/by-user-exam/${userExamId}/grouped`)).data;
    }
    async getAccuracyByQuestionTypeForUser(questionPart,userId) {
        return (await this.api.get(`/accuracy-by-part/${questionPart}/user/${userId}`)).data;
    }

}
export default new UserExamQuestionService;