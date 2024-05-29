import mongoose from "mongoose";
import {OTP_EXPIRE_TIME_SEC} from "../constants";


const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        expireAt: {
            type: Date,
            expires: OTP_EXPIRE_TIME_SEC,
            default: Date.now
        }
    },
    {
        timestamps: true,
        expires: OTP_EXPIRE_TIME_SEC,
    },
);

export default mongoose.model('otp', otpSchema);
