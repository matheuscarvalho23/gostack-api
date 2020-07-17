import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
	user_id: string;
	avatarFile: string;
}

class CreateAvatarService {
	public async execute({ user_id, avatarFile }: Request): Promise<User> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne(user_id);

		if (!user) {
			throw new AppError('Only authenticated users can change avatar.', 401)
		}

		if (user.avatar) {
			const userAvatarFile = path.join(uploadConfig.directory, user.avatar);

			const userAvatarExists = await fs.promises.stat(userAvatarFile);

			if (userAvatarExists) {
				await fs.promises.unlink(userAvatarFile);
			}
		}

		user.avatar = avatarFile;

		await usersRepository.save(user);

		return user;
	}
}

export default CreateAvatarService;
