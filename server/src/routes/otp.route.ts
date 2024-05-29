import express from 'express';
import controller from '../controllers/otp.controller';
import {body, check} from 'express-validator';

const router = express.Router();

router
    .route('/')
    .post(body('email').isEmail(), controller.sendOtp);
router
    .route('/verify')
    .post(
        check('email').isEmail(),
        body('otp').custom(value => {
        if (typeof value !== "string" || !value.trim())
            throw new Error('otp require');
        return value
    }), controller.verifyOtp);

export default router;
