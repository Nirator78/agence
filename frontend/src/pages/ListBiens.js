
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BienService from '../services/bien.service';

export default function Accueil(props) {
    const [biens, setBiens] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const response = await BienService.getBiens();
            setBiens(response);
        }
        fetchData();
    }, [])  
    return (
        <>
        <div className="max-w rounded overflow-hidden shadow-lg">
            <div className="font-bold text-xl mb-2 text-center">Nos biens disponibles</div>
            <div className='text-center'>
                <p>Ici vous pouvez retrouver tout nos biens disponible</p> 
                <p className='font-bold'>Votre futur maison, appartements est ici !</p>
            </div>
            <div className="max-w-lg rounded overflow-hidden shadow-lg ">
                <div className="flex items-center border-b border-sky-700 py-4 grid grid-cols-3 gap-3 pl-2 pr-2">
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option>Choisir un type de logement</option>
                        <option>Maison</option>
                        <option>Appartement</option>
                    </select>
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option>Choisir un type d'achat</option>
                        <option>Location</option>
                        <option>Achat</option>
                    </select>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="piece" type="text" placeholder="Nombre de pièce"></input>
                    <div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="piece" type="text" placeholder="Superficie mini"></input>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="piece" type="text" placeholder="Superficie max"></input>
                    </div>
                    <div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="piece" type="text" placeholder="Prix mini"></input>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="piece" type="text" placeholder="Prix max"></input>
                    </div>
                </div>
                <button className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 m-2 rounded ">
                    Rechercher
                </button>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2">
                {
                    biens?.map((item) => {  
                        return (
                            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" xs={4} key={item.id}>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{item.titre}</div>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.prix} €</span>
                                    <p className="text-gray-700 text-base">
                                    Type : {item.type_bien}
                                    </p>          
                                    <p className="text-gray-700 text-base">
                                    Disponible a {item.type_achat}
                                    </p>                        
                                    <p className="text-gray-700 text-base">
                                    {item.description}
                                    </p>
                                </div>
                                <div className="px-6">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.nbPiece} pièces</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.superficie} m²</span>
                                    {item.piscine ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Piscine </span> : <></>}
                                    {item.cheminee ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Cheminée </span> : <></>}
                                    {item.balcon ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Balcon </span> : <></>}
                                    {item.terrasse ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Terrasse </span> : <></>}
                                </div>
                                <div >
                                <button className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 m-2 rounded " onClick={() => navigate(`/bien/${item.id}`)}>
                                    Plus d'information
                                </button>
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
