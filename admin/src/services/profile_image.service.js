import createApiClient from "./api.service";
class ProfileImageService {
    constructor(baseUrl = "/api/profile-image") {
        this.api = createApiClient(baseUrl);
    }
    async update(userId, data) {
        return (await this.api.put(`/${userId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    }
}
export default new ProfileImageService;