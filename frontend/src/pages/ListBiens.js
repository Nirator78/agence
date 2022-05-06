
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormBien from '../component/subForm/FormBien';
import authService from '../services/auth.service';
import BienService from '../services/bien.service';

export default function Accueil() {
    const [biens, setBiens] = useState([]);
    const [nbBien, setNbBiens] = useState([]);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const response = await BienService.getBiens(data);
        setBiens(response);
    };
    useEffect((data) => {
        async function fetchData() {
            const response = await BienService.getBiens({...data, limit: 10});
            const response1 = await BienService.getBiens({...data});
            setBiens(response);
            setNbBiens(response1);
        }
        fetchData();
    }, [])  
    const user = authService.getUser();
    return (
        <>
        <div className="max-w rounded overflow-hidden shadow-lg grid place-content-center">
            <div className="font-bold text-xl mb-2 text-center">Nos biens disponibles</div>
            <div className='text-center'>
                <p>Ici vous pouvez retrouver tout nos biens disponible</p> 
                <p className='font-bold'>Votre futur maison, appartements est ici !</p>
            </div>
            { user?.role === "admin" && (<FormBien></FormBien>)}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-lg rounded overflow-hidden shadow-lg mb-2 ">
                    <div className="items-center border-b border-sky-700 py-4 grid grid-cols-3 gap-3 pl-2 pr-2">
                        <select {...register("type_bien")} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Choisir un type de logement</option>
                            <option value="maison">Maison</option>
                            <option value="appartement">Appartement</option>
                        </select>
                        <select {...register("type_achat")} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Choisir un type d'achat</option>
                            <option value="location">Location</option>
                            <option value="achat">Achat</option>
                        </select>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="piece" 
                            type="text" 
                            placeholder="Nombre de pièce"
                            {...register("nbPiece")}
                        >
                        </input>
                        <div>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="superficieMini" 
                                type="text" 
                                placeholder="Superficie mini"
                                {...register("superficieMini")}
                                >
                            </input>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="superficieMax" 
                                type="text" 
                                placeholder="Superficie max"
                                {...register("superficieMax")}

                            >

                            </input>
                        </div>
                        <div>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="prixMini" 
                                type="text" 
                                placeholder="Prix mini"
                                {...register("prixMini")}

                            >
                            </input>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="prixMax" 
                                type="text" 
                                placeholder="Prix max"
                                {...register("prixMax")}

                            >

                            </input>
                        </div>
                    </div>
                    <div className='flex px-2 py-2'>
                        <select
                            name="limit"
                            className="form-control block py-2 px-3 ml-2 mr-2 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                            border border-solid border-gray-300 rounded transition ease-in-out m-0"
                            {...register("limit")}
                            
                        > 
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                        / {nbBien.length} nombre logements (hors filtre)
                    </div>
                    <button className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 m-2 rounded " type="submit">
                        Rechercher
                    </button>
                </div>
            </form>
            
        </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2">
                {
                    biens ? biens?.map((item) => {  
                        return (
                            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" xs={4} key={item.id}>
                                <img className="w-full" src={  item?.images[0]?.url} alt="Sunset in the mountains"></img>
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
                    }) : null
                }

            </div>
            
        </>
    )
}
