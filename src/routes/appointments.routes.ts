import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuth from '../middlewares/ensureAuth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

// GET METHODS
appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();

	return response.json({
		status: 'success',
		list: appointments
	});
});

// POST METHODS
appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentService();

	const appointment = await createAppointment.execute({
		date: parsedDate,
		provider_id,
	});

	return response.json({
		status: 'success',
		message: 'Successfully created appointment!',
		list: appointment
	});
});

export default appointmentsRouter;
