import axios from "axios"
const API_URL = "http://localhost:3000/api/v1"

class AuthService {


    login(email, password) {
        const bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);

        return axios
            .post(API_URL + "/user/login?apikey=123456", bodyFormData, { "Content-Type": "multipart/form-data" },)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.clear();
        window.location.reload();
    }
    register(nom, prenom, tel, email, password) {
        const bodyFormData = new FormData();
        bodyFormData.append('nom', nom);
        bodyFormData.append('prenom', prenom);
        bodyFormData.append('tel', tel);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);

        return axios.post(API_URL + '/user?apikey=123456', bodyFormData,{ "Content-Type": "multipart/form-data" })
            .then(response => {
                return response.data;
            });
    }
    getToken() {
        return JSON.parse(localStorage.getItem("token"));
    }
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    isLogin() {
        return localStorage.getItem("token") && localStorage.getItem("user") ? true : false
    }

}
export default new AuthService();