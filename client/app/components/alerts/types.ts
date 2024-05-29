export type tAlertItem = {
    alert_msg: string | string[],
    alert_type: eAlertType,
}

export enum eAlertType {
    default = 'default',
    danger = 'danger',
    success = 'success',
}
