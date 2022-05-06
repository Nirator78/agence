import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import rendezVousService from "../services/rendezVous.service";


function RendezVous({bien}) {
    const [values, setValues] = React.useState({
		email: '',
		date: '',
		nom: '',
		prenom: '',
		tel: '',
		status: ''
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	async function postData() {
		rendezVousService.postRendezUnvous(values.email, values.date, values.nom, values.prenom, values.tel, values.status, bien).then(
			() => {
				window.location.reload();
			},
			error => {
				console.log(error);
			}
		);
	}

	const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: 5 + 'px',
        boxShadow: 24,
        p: 4,
    };

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<div>
                <button
					onClick={handleOpen}
					className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-700 hover:bg-sky-600"
				>
					Prendre un rendez-vous
				</button>
                <Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<form className="bg-white px-8 pt-6 pb-8 mb-4" >
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
									Email
								</label>
								<input 
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
									id="email" 
									type="text" 
									placeholder="Email"
									value={values.email}
									onChange={handleChange('email')}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
									Nom
								</label>
								<input 
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
									id="nom" 
									type="text" 
									placeholder="Nom"
									value={values.nom}
									onChange={handleChange('nom')}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenom">
									Prénom
								</label>
								<input 
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
									id="prenom" 
									type="text" 
									placeholder="Prénom"
									value={values.prenom}
									onChange={handleChange('prenom')}
								/>
							</div>						
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
									Téléphone
								</label>
								<input 
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
									id="tel" 
									type="text" 
									placeholder="Téléphone"
									value={values.tel}
									onChange={handleChange('tel')}
								/>
							</div>
							<div className="mb-6">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
								Date
							</label>
							<input 
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
								id="date" 
								type="date"
								value={values.date}
								onChange={handleChange('date')}
								/>
							</div>
							<div className="flex items-center justify-between">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={postData}>
								Prendre un rendez-vous
							</button>
							</div>
						</form>
					</Box>
				</Modal>
            </div>
		</>
	);
}

export default RendezVous;
