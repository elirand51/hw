'use client';
import {useAppContext} from "@/app/context/provider";
import styles from './styles.module.css';
import {Label} from "@/app/components/label";

export const Alerts = () => {
    const {AppState} = useAppContext();
    const alerts = AppState?.alerts;
    if (!alerts) return <></>;

    return (
        <div
            className={styles.container + ' ' + styles[alerts.alert_type]}
        >
            {Array.isArray(alerts.alert_msg)? (
                alerts.alert_msg.map((alert_msg, alert_msg_i) => (
                    <Label
                        key={alert_msg_i}
                        className={styles.label}
                        label={alert_msg}
                    />
                ))
            ) : (
                <Label className={styles.label} label={alerts.alert_msg} />
            )}
        </div>
    )
}
