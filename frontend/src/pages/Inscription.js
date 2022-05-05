import React from "react";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";


function Inscription() {
    const [values, setValues] = React.useState({
		email: '',
		password: '',
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<div>


				<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-md w-full space-y-8">
						<div>
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inscrire un agent</h2>
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
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onMouseDown={handleMouseDownPassword}
										>
											
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-700 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Inscription
						</button>
					</div>
				</div>
	
            </div>
		</>
	);
}

export default Inscription;
