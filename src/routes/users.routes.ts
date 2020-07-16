import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import ensureAuth from '../middlewares/ensureAuth';
import CreateUserService from '../services/CreateUserService';
import CreateAvatarService from '../services/CreateAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

// POST METHODS
usersRouter.post('/', async (request, response) => {
	try {

		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		delete user.password;

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

usersRouter.patch('/avatar', ensureAuth, upload.single('avatar'), async (request, response) => {
	try {
		const updateAvatar = new CreateAvatarService();

		const user = await updateAvatar.execute({
			user_id: request.user.id,
			avatarFile: request.file.filename,
		});

		delete user.password;

		return response.json({
			status: 'error',
			message: 'Avatar updated.',
			list: user
		});

	} catch (err) {
		return response.status(400).json({
			status: 'error',
			message: err.message
		});
	}
});

export default usersRouter;
