
import React, { useEffect, useState } from 'react';
import RendezVousService from '../services/rendezVous.service';

export default function GestionRendezVous(props) {
    const [rendezVous, setRendezVous] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await RendezVousService.getRendezvous();
            setRendezVous(response);
        }
        fetchData();
    }, [])  
    return (
        <>
        <div className="max-w rounded overflow-hidden shadow-lg">
            <div className="font-bold text-xl mb-2 text-center">Les rendez-vous</div>
            <div className='text-center'>
                <p>Ici vous pouvez retrouver tout les rendez-vous</p> 
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2">
                {
                    rendezVous?.map((item) => {  
                        return (
                            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" xs={4} key={item.id}>
                                <div className="px-6 py-4">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.status}</span>
                                    <div className="font-bold text-xl mb-2">{item.date}</div>
                                    <p className="text-gray-700 text-base">
                                    Nom du bien : {item.bien_id.name}
                                    </p>    
                                    Information demandeur      
                                    <p className="text-gray-700 text-base">
                                       {item.user_id.prenom}
                                       {item.user_id.prenom}
                                    </p>    
                                    <p>
                                    {item.email}
                                    </p>    
                                    <div className='flex'>
                                        <button className="flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-600">
                                            Modifier  
                                        </button>          
                                        <button className="flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600" onClick={() => RendezVousService.deleteRendezvous(item.id)}>
                                            Supprimer  
                                        </button> 
                                    </div>    
     
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}