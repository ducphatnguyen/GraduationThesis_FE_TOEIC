import createApiClient from "./api.service";
class VocabularyService {
    constructor(baseUrl = "/api/vocabulary") {
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
    async getVocabularyByTopic(topicId) {
        return (await this.api.get(`/by-topic/${topicId}`)).data;
    }
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
        link.setAttribute("download", "vocabulary_template.xlsx");
        document.body.appendChild(link);
        link.click();
        // Clean up the temporary URL and link element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }
    async importTemplate(file,topicId) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("topicId", topicId);
        return await this.api.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    async updateStatus(vocabularyId, newStatus) {
        return await this.api.put(`/${vocabularyId}/status`, newStatus);
    }
}
export default new VocabularyService;