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
                setValue('piscine', bien.piscine)
                setValue('balcon', bien.balcon)
                setValue('terrasse', bien.terrasse)
                setValue('cheminee', bien.cheminee)
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
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <button
            onClick={handleOpen}
            className="w-1/4 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-700 hover:bg-green-600"
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
                            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit" />
                        </form>
                    </>
                </Box>
            </Modal>
        </>
    )
}