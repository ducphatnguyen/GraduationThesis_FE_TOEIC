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
    async getAllMaxScoresByExamId() {
        return (await this.api.get("/max-scores")).data;
    }
    async getMaxScoresByDate() {
        return (await this.api.get("/max-scores-by-date")).data;
    }
    async getTotalCompletionTimeByUserId(userId) {
        return (await this.api.get(`/total-completion-time/${userId}`)).data;
    }
    async getTotalExamCountsByExamNameAndType() {
        return (await this.api.get("/total-exam-counts")).data;
    }
    async getDailyExamCounts() {
        return (await this.api.get("/daily-exam-counts")).data;
    }
    async updateStatus(lessonContentId, newStatus) {
        return await this.api.put(`/${lessonContentId}/status`, newStatus);
    }
}
export default new UserExamService;