'use client';
import {eInputMode} from "@/app/components/input/types";
import {OTP_Wrapper} from "@/app/components/otp/index";
import {services} from "../../services";
import {validateEmail} from "@/utils";
import {useAppContext} from "@/app/context/provider";
import {eAlertType} from "@/app/components/alerts/types";
import {useState} from "react";

export const SendOTP = () => {
    const {AppDispatch} = useAppContext();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = (values: Record<string, any>) => {
        setLoading(true);
        const {email} = values;
        const email_ok = validateEmail(email);
        if (!email_ok) {
            setError(true);
            setLoading(false);
            return;
        }
        setError(false);
        services.OTP.send(email).then(
            (res:any) => {
                setLoading(false);
                if (!AppDispatch) return;

                if (res.errors){
                    return services.setAlert(AppDispatch, res.errors, eAlertType.danger);
                }
                services.setAlert(AppDispatch, 'OTP sent ' + res.data.new_otp, eAlertType.success);
            }
        );
    }

    return (
        <OTP_Wrapper
            header={'Send OTP'}
            items={[
                {key: 'email', label: 'Insert mail', input_mode: eInputMode.email,  show_error: error, error_msg: 'Insert valid email'}
            ]}
            onSubmit={onSubmit}
            loading={loading}
        />
    )
}
