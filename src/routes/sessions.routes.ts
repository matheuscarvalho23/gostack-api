import { Router } from 'express';

import CreateAuthService from '../services/CreateAuthService';

const sessionsRouter = Router();

// POST METHODS
sessionsRouter.post('/', async (request, response) => {
	try {

		const { email, password } = request.body;

		const authUser = new CreateAuthService();

		const { user, token } = await authUser.execute({
			email,
			password
		});

		delete user.password;

		return response.json({
			status: 'success',
			message: '',
			list: {
				user,
				token
			},
		});

	} catch (err) {
		return response.status(400).json({
			status: 'error',
			message: err.message
		});
	}
});

export default sessionsRouter;
