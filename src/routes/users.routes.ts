import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// GET METHODS

// POST METHODS
usersRouter.post('/', async (request, response) => {
	try {

		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name,
			email,
			password
		});

		return response.json({
			status: 'success',
			message: 'Successfully created user!',
			list: user,
		});

	} catch (err) {
		return response.status(400).json({
			status: 'error',
			message: err.message
		});
	}
});

export default usersRouter;
