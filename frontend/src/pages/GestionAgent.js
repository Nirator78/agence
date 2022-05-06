
import React, { useEffect, useState } from 'react';
import FormAgent from '../component/subForm/FormAgent';
import AgentService from '../services/agent.service';

export default function GestionAgent(props) {
    const [agent, setAgent] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await AgentService.getAgent();
            setAgent(response);
        }
        fetchData();
    }, [])  
    return (
        <>
        <div className="max-w rounded overflow-hidden shadow-lg">
            <div className="font-bold text-xl mb-2 text-center">Tous les agents</div>
            <div className='text-center'>
                <p>Ici vous pouvez retrouver tout les agents</p> 
            </div>
            <FormAgent></FormAgent>
            <div className="grid md:grid-cols-3 sm:grid-cols-2">
                {
                    agent?.map((item) => {  
                        return (
                            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" xs={4} key={item.id}>
                                <div className="px-6 py-4">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.role}</span>   
                                    <p className="text-gray-700 text-base">
                                       {item.nom} {item.prenom}
                                    </p>    
                                    <p>
                                        {item.email}
                                    </p>                                     
                                    <p>
                                        {item.tel}
                                    </p>    
                                    <div className='flex'>
                                        <FormAgent id={item.id}/>       
                                        <button className="flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600" onClick={async () => await AgentService.deleteAgent(item.id) &&  window.location.reload() }>
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