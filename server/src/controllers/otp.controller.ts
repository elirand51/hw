import httpStatus from 'http-status';
import { Request, Response } from "express";
import {validationResult} from "express-validator";
import {CitiesList} from "../data/cities";
import {getCityWeather} from "../helpers";
import OtpSchema from '../models/otpModel';
import {OTP_EXPIRE_TIME_SEC} from "../constants";
import {mailTemplates} from "../email_templates";
import services from "../services";

const checkDigit = (digit: number) => {
  if (digit < 10) {
    return  "0" + digit;
  }
  return digit;
};

const generateOTP = async () => {
  const random_cities = CitiesList.randomCities(3);
  if (!random_cities) throw new Error('No cities');
  let otp_code = '';

  for (let i=0; i<random_cities.length; i++){
    const weather = await getCityWeather(random_cities[i]);
    otp_code += checkDigit(Math.round(Math.abs(weather)))
  }

  return otp_code;
}

const sendOtp = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors: 'Email is require'});

    const {email} = req.body;
    const otp_exist = await OtpSchema.findOne({email});
    if (otp_exist) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors: 'OTP for this email exist'});
    }

    const otp = await generateOTP();
    // const email_res = await services.sendEmail({
    //   to: email,
    //   ...mailTemplates.mailOTP(otp)
    // });
    // if (!email_res)
    //    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors: 'Email not sent try again later '});

    const new_otp = new OtpSchema({email, otp});
    await new_otp.save();

    return res.json({new_otp: new_otp.otp});
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors: 'Server error'});  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array().map(err => {
        const error = err as {type: string, value: string, msg: string, path: string, location: string };
        if (error.path === 'email')
          return 'Email is required';
        return 'OTP is required';
      });
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors});
    }

    const {email, otp} = req.body;
    const otp_exist = await OtpSchema.findOne({email});
    if (!otp_exist)
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors: 'OTP not exist'});
    if (otp_exist.otp !== otp)
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors: 'OTP not match'});

    const createdAt = new Date(otp_exist.createdAt);
    const milliDiff = (new Date()).getTime() - createdAt.getTime();
    if (milliDiff >= (OTP_EXPIRE_TIME_SEC*1000)) {
      await OtpSchema.deleteMany({email});
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors: 'OTP expired'});
    }

    return res.json({msg: 'OTP verified'});
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errors: 'Server error'});
  }
};
export default {sendOtp, verifyOtp};
