import express from 'express';
import otpRoutes from './otp.route';

const appRoutes = express.Router();

appRoutes.use('/otp', otpRoutes);

export default appRoutes;
