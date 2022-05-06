import axios from "axios"
import qs from "qs"
const API_URL = "http://localhost:3000/api/v1"
class AgentService {
    async getAgents(
        limit
    ) {
        if (limit) {
            const response = await axios.get(API_URL + '/user?limit=' + limit + '&apikey=123456',{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const agents = await response.data;
            return agents
        }
        else {
            const response = await axios.get(API_URL + '/user?apikey=123456',{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const agents = await response.data;
            return agents
        }
    }

    async getAgent(
        id
    ) {
        const response = await axios.get(API_URL + '/user/' + id + '?apikey=123456',{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const agents = await response.data;
        return agents

    }

    async postAgent(
        payload
    ) {
        const bodyFormData = new FormData();
        bodyFormData.append('nom', payload.nom);
        bodyFormData.append('prenom', payload.prenom);
        bodyFormData.append('email', payload.email);
        bodyFormData.append('tel', payload.tel);
        bodyFormData.append('password', payload.password);

        return await axios.post(API_URL + '/user?apikey=123456', bodyFormData,{ "Content-Type": "multipart/form-data" })
        .then(response => {
            return response.data;
        });
    }

    async putAgent(
        payload
    ) {
        const id = payload.id;
        delete payload.id;
        const data = qs.stringify(payload);
        console.log(data)
        const response = await axios.put(API_URL + '/user/' + id + '?apikey=123456', data,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const bien = await response.data;
        return bien

    }

    async deleteAgent(
        id
        ) {
            const response = await axios.delete(API_URL + '/user/' + id + '?apikey=123456',{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const user = await response.data;
            return user
        }
    
}

export default new AgentService();
