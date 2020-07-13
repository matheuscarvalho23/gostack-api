import { Router, request, response } from 'express';

const routes = Router();

routes.post('/', (request, response) => {

	const { name, email } = request.body;

	const user = {
		name,
		email,
	};

	return response.json({ message: 'faalla baiano' })
})

export default routes;
