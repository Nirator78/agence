import axios from "axios"
const API_URL = "http://localhost:3000/api/v1"

class BienService {
    async getBiens(
        limit
    ) {
        if (limit) {
            const response = await axios.get(API_URL + '/bien?limit=' + limit + '&apikey=123456',{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const biens = await response.data;
            return biens
        }
        else {
            const response = await axios.get(API_URL + '/bien?apikey=123456',{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const biens = await response.data;
            return biens
        }
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
    
}

export default new BienService();
