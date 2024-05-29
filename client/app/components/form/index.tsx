import {Label} from "@/app/components/label";
import {Input} from "@/app/components/input";
import {Button} from "@/app/components/button";
import styles from './styles.module.css';
import {useId, useState} from "react";
import {tFormItem} from "@/app/components/form/types";
import {Loading} from "@/app/components/loading";

type Props = {
    items: tFormItem[],
    onSubmit: (values: Record<string, any>) => void,
    loading?: boolean
}

const Item = ({item, value, onChange} : {item: tFormItem, value: string | number, onChange: (item_key: string, value: string) => void}) => {
    const id = useId();

    return (
        <>
            <Label htmlFor={id} label={item.label}/>
            <div className={'grid place-items-center gap-1'}>
                <Input
                    id={id}
                    item_key={item.key}
                    value={value}
                    input_mode={item.input_mode}
                    onChange={onChange}
                />

                {item.error_msg && (
                    <Label
                        label={item.error_msg}
                        label_style={{
                            color: 'red',
                            opacity: Number(item.show_error),
                            fontSize: 14,
                        }}
                    />
                )}
            </div>
        </>
    )
}

const initValues = (items: tFormItem[]) => {
    let obj: Record<string, any> = {};
    items.forEach(item => obj[item.key] = null);
    return obj;
}

export const FormItem = ({items, onSubmit, loading}: Props) => {
    const [values, setValues] = useState<Record<string, any>>(initValues(items));
    const onChange = (item_key: string, value: string) => {
        setValues(v => ({
            ...v,
            [item_key]: value
        }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.form_items}>
                {loading && (
                    <Loading
                        containerClassName={'absolute w-full h-full top-0 left-0'}
                    />
                )}
                {items.map(
                    item => (
                        <Item
                            key={item.key}
                            value={values[item.key]}
                            item={item}
                            onChange={onChange}
                        />
                    )
                )}
            </div>
            <Button label={'Submit'} onClick={() => onSubmit(values)}/>
        </div>
    )
}
