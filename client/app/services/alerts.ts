import {eAlertType} from "@/app/components/alerts/types";
import {eAppStateDispatchType} from "@/app/context/types";
import {AlertTimeOut} from "@/contants";

const setAlert = (dispatch: Function, alert_msg: string | string[], alert_type = eAlertType.default) => {
    dispatch({
        type: eAppStateDispatchType.ADD_ALERT,
        payload: {
            alert_msg,
            alert_type
        }
    });

    setTimeout(() => {
        dispatch({
            type: eAppStateDispatchType.REMOVE_ALERT
        });
    }, AlertTimeOut);
}

export default setAlert;
