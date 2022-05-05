import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RendezVous from "../component/RendezVous";
import FormBien from "../component/subForm/FormBien";
import authService from "../services/auth.service";
import bienService from "../services/bien.service";



function Bien(props) {
    const [bien, setBien] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const response = await bienService.getBien(id);
            setBien(response);
        }
        fetchData();
    }, [id])  
    const user = authService.getUser();

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" xs={4} key={bien.id}>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{bien.titre}</div>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{bien.prix} €</span>
                    <p className="text-gray-700 text-base">
                    Type : {bien.type_bien}
                    </p>          
                    <p className="text-gray-700 text-base">
                    Disponible a {bien.type_achat}
                    </p>                        
                    <p className="text-gray-700 text-base">
                    {bien.description}
                    </p>
                </div>
                <div className="px-6">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{bien.nbPiece} pièces</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{bien.superficie} m²</span>
                    {bien.piscine ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Piscine </span> : <></>}
                    {bien.cheminee ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Cheminée </span> : <></>}
                    {bien.balcon ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Balcon </span> : <></>}
                    {bien.terrasse ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Terrasse </span> : <></>}
                </div>
                <RendezVous bien={bien.id}/>
                {user?.role === "ROLE_ADMIN" && (
                <div className='flex'>
                <FormBien id={bien.id} />         
                    <button className="flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600" onClick={async () => await bienService.deleteBien(bien.id) &&  navigate(`/bien`) }>
                        Supprimer  
                    </button> 
                </div>  
                )}  
            </div>
        </div>
    )
}

export default Bien;