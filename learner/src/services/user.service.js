import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }
    async signUp(data) {
        return (await this.api.post("/signup", data)).data;
    }
    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
    async signOut() {
        return (await this.api.post("/signout")).data;
    }
    async getUserIdByUsername(username) {
        return (await this.api.get(`/getUserIdByUsername/${username}`)).data;
    }
    async refreshToken(data) {
        return (await this.api.post("/refreshtoken", data)).data;
    }

    async saveToken(token, refreshToken, jwtExpirationTime, refreshTokenExpirationTime) {
        localStorage.setItem("learnerToken", token);
        localStorage.setItem("learnerRefreshToken", refreshToken);
        localStorage.setItem("learnerAccessTokenExpirationTime", (Date.now() + jwtExpirationTime).toString());
        localStorage.setItem("learnerRefreshTokenExpirationTime", (Date.now() + refreshTokenExpirationTime).toString());
    }

    // Kiểm tra tính hợp lệ của token (AccessToken và RefreshToken)
    async checkTokensValidity() {
        const accessTokenExpireTime = localStorage.getItem("learnerAccessTokenExpirationTime");
        // console.log(accessTokenExpireTime)
        const refreshTokenExpireTime = localStorage.getItem("learnerRefreshTokenExpirationTime");
        // console.log(refreshTokenExpireTime)
        if (accessTokenExpireTime && Number(accessTokenExpireTime) >= Date.now()) {
            // Nếu access token vẫn còn hợp lệ, thì không cần refresh lại token
            return true;
        }
        else if (refreshTokenExpireTime && Number(refreshTokenExpireTime) >= Date.now()) {
            // console.log("peekapoo my friends, kkk");
            // Nếu access token hết hạn, nhưng refresh token còn hợp lệ, thì dùng refreshtoken để lấy accesstoken mới
            const refreshToken = localStorage.getItem("learnerRefreshToken");
            // console.log(refreshToken)
            try {
                const response = await this.refreshToken({ refreshToken });
                const newAccessToken = response.accessToken;
                // console.log(newAccessToken)
                // Cập nhật lại thời hạn của access token mới vào local storage
                localStorage.setItem("learnerAccessTokenExpirationTime", (Date.now() + response.jwtExpirationTime).toString());
                // Lưu access token mới vào local storage
                localStorage.setItem("learnerToken", newAccessToken);
                return true; // Token refresh thành công
            } catch (error) {
                console.log("Error refreshing token:", error);
                return false; // Token refresh thất bại
            }
        } else {
            // Both access token and refresh token have expired
            this.signOut();
            // Logout the user on token expiration
            return false;
        }
    }

    async getUserById(userId) {
        return (await this.api.get(`/users/${userId}`)).data;
    }

    async update(userId, data) {
        console.log(data)
        return (await this.api.put(`/${userId}`, data)).data;
    }
    
    async changePassword(userId, data) {
        console.log(data)
        return (await this.api.put(`/change-password/${userId}`, data)).data;
    }

    async checkEmailExists(email) {
        console.log(email)
        return await this.api.get("/check-email-exists", {
            params: { email },
        });
    }
    
}

export default new UserService;
