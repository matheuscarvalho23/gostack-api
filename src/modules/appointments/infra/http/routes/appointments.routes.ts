import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuth);

// GET METHODS
// appointmentsRouter.get('/', async (request, response) => {
// 	const appointments = await appointmentsRepository.find();

// 	return response.json({
// 		status: 'success',
// 		list: appointments,
// 	});
// });

// POST METHODS
appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentService(
		appointmentsRepository,
	);

	const appointment = await createAppointment.execute({
		date: parsedDate,
		provider_id,
	});

	return response.json({
		status: 'success',
		message: 'Successfully created appointment!',
		list: appointment,
	});
});

export default appointmentsRouter;
