import axios from "axios"
const API_URL = "http://localhost:3000/api/v1"

class RendezVousService {
    async getRendezvous(
    ) {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL + '/rdv?apikey=123456',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const rdv = await response.data;
        return rdv
    }

    async getRendezUnvous(
        id
    ) {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL + '/rdv/' + id + '?apikey=123456',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const rdv = await response.data;
        return rdv

    }

    postRendezUnvous(email, date, nom, prenom, tel, status, bien) {
        const bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('date', date);
        bodyFormData.append('nom', nom);
        bodyFormData.append('prenom', prenom);
        bodyFormData.append('tel', tel);
        if(status){
            bodyFormData.append('status', status);
        }else {
            bodyFormData.append('status', "en_attente");
        }
        bodyFormData.append('bien_id', bien);
        return axios
            .post(API_URL + "/rdv?apikey=123456", bodyFormData,{headers: { "Content-Type": "multipart/form-data"}})
            .then(response => {
                return response.data;
            });
    }

    async deleteRendezvous(
        id
        ) {
            const token = localStorage.getItem('token');
            const response = await axios.delete(API_URL + '/rdv/' + id + '?apikey=123456',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const rdv = await response.data;
            return rdv
        }
    
}

export default new RendezVousService();
