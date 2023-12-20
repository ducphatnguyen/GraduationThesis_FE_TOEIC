import createApiClient from "./api.service";
class ExamQuestionService {
    constructor(baseUrl = "/api/exam-question") {
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
    async getQuestionsByExamId(examId) {
        return (await this.api.get(`/by-exam/${examId}`)).data;
    }
    // IMPORT + EXPORT
    async exportTemplate() {
        const response = await this.api.get("/download-template");
        // Handle the file download 
        const blob = new Blob(
            [response.data],
            { type: response.headers["content-type"] }
        );
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "exam_question_fulltest_template.xlsx");
        document.body.appendChild(link);
        link.click();
        // Clean up the temporary URL and link element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }
    async importTemplate(excelFile,examId) {
        const formData = new FormData();
        formData.append("file", excelFile);
        formData.append("examId", examId);
        return await this.api.post("/upload-excel", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    async uploadExamQuestionImages(imageFiles) {
        const formData = new FormData();
        formData.append("questionImage", imageFiles);
        return (await this.api.post("/upload-image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));
    }
    async uploadExamQuestionAudios(audioFiles) {
        const formData = new FormData();
        formData.append("questionAudio", audioFiles);
        return (await this.api.post("/upload-audio", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));
    }
    async updateStatus(examQuestionId, newStatus) {
        return await this.api.put(`/${examQuestionId}/status`, newStatus);
    }
    async deleteExamQuestionsByExamId(examId) {
        return (await this.api.delete(`/delete-by-exam/${examId}`)).data;
    }
}
export default new ExamQuestionService;