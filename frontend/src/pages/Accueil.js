import React, { useEffect, useState } from 'react';
import BienService from '../services/bien.service';

export default function Accueil(props) {
    const [biens, setBiens] = useState([]);

    useEffect((data) => {
        async function fetchData() {
            const response = await BienService.getBiens({...data, limit:5});
            setBiens(response);
        }
        fetchData();
    }, [])  
    return (
        <>
        <div className="max-w rounded overflow-hidden shadow-lg">
            <div className="font-bold text-xl mb-2 text-center">Quelques uns de nos appartements / maisons </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2">
                {
                    biens?.map((item) => {  
                        return (
                            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" xs={4} key={item.id}>
                                <img className="w-full" src={  item?.images[0]?.url} alt=""></img>
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
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.nbPiece} pièces</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.superficie} m²</span>
                                    {item.piscine ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Piscine </span> : <></>}
                                    {item.cheminee ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Cheminée </span> : <></>}
                                    {item.balcon ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Balcon </span> : <></>}
                                    {item.terrasse ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Terrasse </span> : <></>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className='text-center bg-gray-200 p-4'>
                <p className='font-bold'> QUI SOMMES NOUS ?</p>
                <p>Nous sommes une agence immobilière orientée vers l'écoute, la satisfaction de nos clients acquéreurs et vendeurs est fondamentale.</p> 
                <p> Grâce à notre sérieux et notre rigueur, nous avons établie une vraie relation de confiance avec nos clients. </p>
                <p>Notre équipe n’a qu’un seul but, vous accompagner et vous guider tout au long de votre projet</p> 
                <p className='font-bold'>Immobilier, Appartement, Maison, Terrain …</p>
                <p> 
                    Que l’on soit seul, en couple ou en famille, l’accès à la propriété ou la vente de son bien représente un des choix les plus importants de sa vie.         
                </p>
                <p className='font-bold'>Votre confiance est notre réussite !</p>
                <p className=''>Chez ZANZIBARD APPARTEMENTS rien n'est mis au hazard</p>
            </div>
        </>
    )
}
