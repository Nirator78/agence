import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormControl, Input, InputLabel } from "@mui/material";
import authService from "../../services/auth.service";


function Connexion(props) {
    const [values, setValues] = React.useState({
		email: '',
		password: '',
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

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

	async function postData() {
		authService.login(values.email, values.password).then(
			() => {
				window.location.reload();
			},
			error => {
				console.log(error);
			}
		);
	}
	return (
		<>
			<div>
                <button
					onClick={handleOpen}
					className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-700 hover:bg-sky-600"
				>
					Connexion
				</button>
                <Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
							<div className="max-w-md w-full space-y-8">
								<div>
									<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connexion a votre compte</h2>
								</div>
								<FormControl fullWidth variant="standard">
									<InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
									<Input
										id="standard-adornment-email"
										type="email"
										value={values.email}
										onChange={handleChange('email')}
									/>
								</FormControl>
								<FormControl fullWidth variant="standard">
									<InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
									<Input
										id="standard-adornment-password"
										value={values.password}
										onChange={handleChange('password')}
										sx={{ width: 1 }}
										type="password"
									/>
								</FormControl>
                                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-700 hover:bg-sky-600" onClick={postData}>
                                    Connexion
                                </button>
							</div>
						</div>
					</Box>
				</Modal>
            </div>
		</>
	);
}

export default Connexion;
