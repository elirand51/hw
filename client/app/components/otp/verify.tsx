'use client';
import {eInputMode} from "@/app/components/input/types";
import {OTP_Wrapper} from "@/app/components/otp/index";
import {useAppContext} from "@/app/context/provider";
import {validateEmail} from "@/utils";
import {services} from "../../services";
import {eAlertType} from "@/app/components/alerts/types";
import {useState} from "react";

export const VerifyOTP = () => {
    const {AppDispatch} = useAppContext();
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const onSubmit = (values: Record<string, any>) => {
        setLoading(true);
        const {email, otp} = values;
        const email_ok = validateEmail(email);
        const errors_ = [];
        if (!email_ok) errors_.push('email');
        if (!otp) errors_.push('otp');
        if (errors_.length) {
            setErrors(errors_);
            setLoading(false);
            return
        }
        setErrors([]);
        services.OTP.verify(email, otp.toString()).then(
            (res:any) => {
                setLoading(false);
                if (!AppDispatch) return;

                if (res.errors){
                    return services.setAlert(AppDispatch, res.errors, eAlertType.danger);
                }
                services.setAlert(AppDispatch, 'OTP verified', eAlertType.success);
            }
        );

    }

    return (
        <OTP_Wrapper
            header={'Verify OTP'}
            items={[
                {key: 'email', label: 'Insert mail', input_mode: eInputMode.email, show_error: errors.indexOf('email') > -1, error_msg: 'Email is required'},
                {key: 'otp', label: 'Insert OTP', input_mode: eInputMode.number, show_error: errors.indexOf('otp') > -1, error_msg: 'OTP is required'},
            ]}
            onSubmit={onSubmit}
            loading={loading}
        />
    )
}
