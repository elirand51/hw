import style from './styles.module.css';

type Props = {
    label: string,
    htmlFor?: string,
    className?: string,
    label_style?: Record<string, any>
}
export const Label = ({label_style = {}, className = '', label, htmlFor} : Props) => {
    return (
        <label
            htmlFor={htmlFor}
            className={style.label + ' ' + className}
            style={label_style}
        >{label}</label>
    )
}
