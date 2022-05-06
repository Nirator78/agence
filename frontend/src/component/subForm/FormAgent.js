import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import AgentService from "../../services/agent.service";
import { useForm } from "react-hook-form";



export default function FormAgent({id}) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = async (data) => {
        if(id){
            Object.assign(data, { id: id });
            await AgentService.putAgent(data);

        }else {
            await AgentService.postAgent(data);
        }
        window.location.reload();
    };

    useEffect(() => {
        async function fetchData() {
            if(id){
                const agent = await AgentService.getAgent(id);

                setValue('nom', agent.nom)
                setValue('prenom', agent.prenom)
                setValue('tel', agent.tel)
                setValue('email', agent.email)
                setValue('password', agent.password)
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
        width:500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 28,
        p: 4,
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
                    { id ? 'Modifier le agent' : 'Crée un agent'}
                    </Typography>
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="nom">
                                Nom
                            </label>
                            <input
                                name="nom"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Nom"
                                {...register("nom")}
                            />
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="prenom">
                                Prénom
                            </label>
                            <input
                                name="prenom"
                                className="form-control w-full block shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                placeholder="Prénom"
                                {...register("prenom")}
                            />
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                name="email"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Email"
                                {...register("email")}
                                
                            />
                            <br></br>
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="tel">
                                Téléphone
                            </label>
                            <input
                                name="tel"
                                className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                placeholder="Téléphone"
                                {...register("tel")}
                            />
                            <br></br>
                            {!id && (
                                <>
                                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="password">
                                        Mot de passe
                                    </label>
                                    <input
                                        name="password"
                                        className="form-control w-full block py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                        border border-solid border-gray-300 rounded transition ease-in-out m-0"
                                        placeholder="Mot de passe"
                                        {...register("password")}
                                        type="password"
                                    />
                                    <br></br>
                                </>
                                )
                            }
                            
                            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit" />
                        </form>
                    </>
                </Box>
            </Modal>
        </>
    )
}