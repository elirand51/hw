import style from './styles.module.css';
import {eInputMode} from "@/app/components/input/types";

type Props = {
    id: string,
    item_key: string,
    value: string | number,
    onChange: (item_key: string, value: string) => void,
    input_mode: eInputMode,
}

export const Input = ({id, item_key, value, onChange, input_mode} : Props) => {
    const onInputChange = (text: string) => {
        if (text !== '' && input_mode === eInputMode.number){
            const digitRegex = /^\d+$/;
            const isNumber = digitRegex.test(text);
            if (!isNumber) return;
        }
        onChange(item_key, text);
    }

    return (
        <input
            id={id}
            className={style.input}
            value={value || ''}
            onChange={e => onInputChange(e.target.value)}
        />
    )
}
