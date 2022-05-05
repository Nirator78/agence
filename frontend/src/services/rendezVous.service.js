import axios from "axios"
const API_URL = "http://localhost:3000/api/v1"

class RendezVousService {
    async getRendezvous(
    ) {
        const response = await axios.get(API_URL + '/rdv?apikey=123456',{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const rdv = await response.data;
        return rdv
    }

    async getRendezUnvous(
        id
    ) {
        const response = await axios.get(API_URL + '/rdv/' + id + '?apikey=123456',{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const rdv = await response.data;
        return rdv

    }

    async deleteRendezvous(
        id
        ) {
            const response = await axios.delete(API_URL + '/rdv/' + id + '?apikey=123456',{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const rdv = await response.data;
            return rdv
        }
    
}

export default new RendezVousService();
