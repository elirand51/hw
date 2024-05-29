import {eInputMode} from "@/app/components/input/types";

export type tFormItem = {
    key: string,
    label: string,
    input_mode: eInputMode,
    error_msg?: string,
    show_error?: boolean,
}
