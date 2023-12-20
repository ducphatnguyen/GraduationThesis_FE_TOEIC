import createApiClient from "./api.service";
class NoteService {
    constructor(baseUrl = "/api/note") {
        this.api = createApiClient(baseUrl);
    }
    async createNote(data) {
        return (await this.api.post("", data)).data;
    }
    async getAllNotesByUserId(userId) {
        return (await this.api.get(`/user/${userId}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }


}
export default new NoteService;