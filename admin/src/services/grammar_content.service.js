import createApiClient from "./api.service";
class GrammarContentService {
    constructor(baseUrl = "/api/grammar-content") {
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
    async getGrammarContentsByGrammar(grammarId) {
        return (await this.api.get(`/by-grammar/${grammarId}`)).data;
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
        link.setAttribute("download", "grammar_content_template.xlsx");
        document.body.appendChild(link);
        link.click();
        // Clean up the temporary URL and link element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }
    async importTemplate(file) {
        const formData = new FormData();
        formData.append("file", file);

        return await this.api.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    async updateStatus(grammarContentId, newStatus) {
        return await this.api.put(`/${grammarContentId}/status`, newStatus);
    }
}
export default new GrammarContentService;