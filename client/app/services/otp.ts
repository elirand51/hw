import api from "@/utils/api";

const BASE_URL = '/otp';

const send = async (email: string) => {
    try {
        return await api.post(BASE_URL, {email});
    }
    catch (e:any) {
        const errors = e.response?.data?.errors;
        return {errors};
    }
}

const verify = async (email: string, otp: string) => {
    try {
        return await api.post(BASE_URL + '/verify', {email, otp});
    }
    catch (e:any) {
        const errors = e.response?.data?.errors;
        return {errors};
    }
}

export default {send, verify};


