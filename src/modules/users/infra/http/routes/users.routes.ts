import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuth from '../middlewares/ensureAuth';
import CreateUserService from '@modules/users/services/CreateUserService';
import CreateAvatarService from '@modules/users/services/CreateAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

// POST METHODS
usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body;

	const createUser = new CreateUserService();

	const user = await createUser.execute({
		name,
		email,
		password,
	});

	// delete user.password;

	return response.json({
		status: 'success',
		message: 'Successfully created user!',
		list: user,
	});
});

usersRouter.patch(
	'/avatar',
	ensureAuth,
	upload.single('avatar'),
	async (request, response) => {
		const updateAvatar = new CreateAvatarService();

		const user = await updateAvatar.execute({
			user_id: request.user.id,
			avatarFile: request.file.filename,
		});

		delete user.password;

		return response.json({
			status: 'error',
			message: 'Avatar updated.',
			list: user,
		});
	},
);

export default usersRouter;
