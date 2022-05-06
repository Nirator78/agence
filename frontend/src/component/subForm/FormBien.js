import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import BienService from "../../services/bien.service";
import { useForm } from "react-hook-form";



export default function FormBien({id}) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = async (data) => {
        if(id){
            Object.assign(data, { id: id });
            await BienService.putBien(data);

        }else {
            await BienService.postBien(data);
        }
        window.location.reload();
    };

    useEffect(() => {
        async function fetchData() {
            if(id){
                const bien = await BienService.getBien(id);

                setValue('titre', bien.titre)
                setValue('description', bien.description)
                setValue('type_achat', bien.type_achat)
                setValue('type_bien', bien.type_bien)
                setValue('prix', bien.prix)
                setValue('superficie', bien.superficie)
                setValue('nbPiece', bien.nbPiece)
                setValue('piscine', bien.piscine?1:0)
                setValue('balcon', bien.balcon?1:0)
                setValue('terrasse', bien.terrasse?1:0)
                setValue('cheminee', bien.cheminee?1:0)
            }
            
        }
        fetchData();
    }, [])


    const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 28,
        overflow:'scroll',
        p: 4,
        height:'100%',
        display:'block'
    };

    return (
        <>
            <button
            onClick={handleOpen}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-700 hover:bg-green-600"
            >
            { id ? 'Modifier' : 'Crée'}
            </button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
    
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    { id ? 'Modifier le bien' : 'Crée un bien'}
                    </Typography>
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="titre">
                                Titre du bien
                            </label>
                            <input
                                name="titre"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Titre"
                                {...register("titre")}
                            />
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                name="description"
                                className="form-control w-full block shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                placeholder="Déscription"
                                {...register("description")}
                            />
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="type_bien">
                                Type du bien
                            </label>
                            <select
                                name="type_bien"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Type de bien"
                                {...register("type_bien")}
                                
                            >
                                <option value="">Choisir un type de logement</option>
                                <option value="Maison">Maison</option>
                                <option value="Appartement">Appartement</option>
                            </select>
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="type_achat">
                                Titre achat
                            </label>
                            <select
                                name="type_achat"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Titre achat"
                                {...register("type_achat")}
                            > 
                                <option value="">Choisir un type d'achat</option>
                                <option value="location">Location</option>
                                <option value="l'achat">Achat</option>
                            </select>
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="prix">
                                Prix
                            </label>
                            <input
                                name="prix"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Prix"
                                {...register("prix")}
                            />
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="superficie">
                                Superficie
                            </label>
                            <input
                                name="superficie"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Superficie"
                                {...register("superficie")}
                            />
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="nbPiece">
                                Nombre de piéce
                            </label>
                            <input
                                name="nbPiece"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Nombre de piéce"
                                {...register("nbPiece")}
                            />
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="piscine">
                                Piscine
                            </label>
                            <select
                                name="piscine"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Piscine"
                                {...register("piscine")}
                            >
                                <option value="">Une piscine ?</option>
                                <option value={1}>Oui</option>
                                <option value={0}>Non</option>
                            </select>
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="balcon">
                                Balcon
                            </label>
                            <select
                                name="balcon"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Balcon"
                                {...register("balcon")}
                            >
                                <option value="">Un balcon ?</option>
                                <option value={1}>Oui</option>
                                <option value={0}>Non</option>
                            </select>
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="terrasse">
                                Terrasse
                            </label>
                            <select
                                name="terrasse"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Terrasse"
                                {...register("terrasse")}
                            >
                                <option value="">Une terrasse ?</option>
                                <option value={1}>Oui</option>
                                <option value={0}>Non</option>
                            </select>
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="cheminee">
                                Cheminée
                            </label>
                            <select
                                name="cheminee"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Cheminée"
                                {...register("cheminee")}
                            >
                                <option value="">Une cheminée ?</option>
                                <option value={1}>Oui</option>
                                <option value={0}>Non</option>
                            </select>
                            <br></br>
                            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit" />
                        </form>
                    </>
                </Box>
            </Modal>
        </>
    )
}