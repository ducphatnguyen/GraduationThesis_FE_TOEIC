import createApiClient from "./api.service";
class FreeMaterialService {
    constructor(baseUrl = "/api/free-material") {
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
    async allEnable() {
        return (await this.api.get("/enable")).data;
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
    async updateStatus(materialId, newStatus) {
        return await this.api.put(`/${materialId}/status`, newStatus);
    }

    // DOWNLOAD FILE PDF
    async downloadFilePdf(fileName) {
        console.log(fileName)
        const response = await this.api.get(`/download/${fileName}`);
        // Handle the file download 
        const blob = new Blob(
            [response.data],
            { type: response.headers["content-type"] }
        );
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Sử dụng biến `fileName` làm tên tệp
        document.body.appendChild(link);
        link.click();

        // Clean up the temporary URL and link element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }


}
export default new FreeMaterialService;