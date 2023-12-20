import createApiClient from "./api.service";
class UserExamService {
    constructor(baseUrl = "/api/user-exam") {
        this.api = createApiClient(baseUrl);
    }
    async createUserExam(data) {
        return (await this.api.post("", data)).data;
    }
    async getAllUserExams() {
        return (await this.api.get("")).data;
    }
    async getUserExamsByExamIdAndUserId(examId, userId) {
        return (await this.api.get(`/user-exams/${examId}/${userId}`)).data;
    }
    async getUserExamById(userExamId) {
        return (await this.api.get(`/${userExamId}`)).data;
    }
    async hasUserExamsWithExamId(examId, userId) {
        return (await this.api.get(`/has-user-exams/${examId}/${userId}`)).data;
    }
    async getAllMaxScoresByExamId(userId) {
        return (await this.api.get(`/max-scores/${userId}`)).data;
    }
    async getMaxScoresByDate(userId) {
        return (await this.api.get(`/max-scores-by-date/${userId}`)).data;
    }
    async getTotalCompletionTimeByUserId(userId) {
        return (await this.api.get(`/total-completion-time/${userId}`)).data;
    }
    async getUserExamsLengthByUserId(userId) {
        return (await this.api.get(`/user-exams/length/${userId}`)).data;
    }

}
export default new UserExamService;