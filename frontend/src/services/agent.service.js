import axios from "axios"
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
