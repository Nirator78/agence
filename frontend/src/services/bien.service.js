import axios from "axios"
import qs from "qs"; 

const API_URL = "http://localhost:3000/api/v1";
class BienService {
    async getBiens(
        data
    ) {
        if(!data) data={};
        let url = `${API_URL}/bien/?apikey=123456`;
        for (const [key, value] of Object.entries(data)) {
            if(value){
                url += `&${key}=${value}`;
            }
        }
        const response = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const biens = await response.data;
        return biens || [];
        
    }

    async getBien(
        id
    ) {
        const response = await axios.get(API_URL + '/bien/' + id + '?apikey=123456',{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const bien = await response.data;
        return bien

    }

    async postBien(
        payload
    ) {
        const bodyFormData = new FormData();
        const token = localStorage.getItem('token');

        bodyFormData.append('titre', payload.titre);
        bodyFormData.append('description', payload.description);
        bodyFormData.append('type_achat', payload.type_achat);
        bodyFormData.append('type_bien', payload.type_bien);
        bodyFormData.append('prix', payload.prix);
        bodyFormData.append('superficie', payload.superficie);
        bodyFormData.append('nbPiece', payload.nbPiece);
        bodyFormData.append('piscine', payload.piscine);
        bodyFormData.append('balcon', payload.balcon);
        bodyFormData.append('terrasse', payload.terrasse);
        bodyFormData.append('cheminee', payload.cheminee);
        bodyFormData.append('user_id', payload.user_id);


        return await axios.post(API_URL + '/bien?apikey=123456', bodyFormData,{headers: { "Content-Type": "multipart/form-data", 'Authorization': token }})
        .then(response => {
            return response.data;
        });
    }

    async putBien(
        payload
    ) {
        const id = payload.id;
        delete payload.id;
        const data = qs.stringify(payload);
        const token = localStorage.getItem('token');

        const response = await axios.put(API_URL + '/bien/' + id + '?apikey=123456', data,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        });
        const bien = await response.data;
        return bien

    }

    async deleteBien(
        id
        ) {
            const token = localStorage.getItem('token');
            const response = await axios.delete(API_URL + '/bien/' + id + '?apikey=123456',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const bien = await response.data;
            return bien
        }
    
}

export default new BienService();
