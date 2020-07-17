import { Router } from 'express';

import CreateAuthService from '../services/CreateAuthService';

const sessionsRouter = Router();

// POST METHODS
sessionsRouter.post('/', async (request, response) => {
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
});

export default sessionsRouter;
