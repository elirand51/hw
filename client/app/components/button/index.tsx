import styles from './styles.module.css';

type Props = {
    label: string,
    onClick: () => void
}
export const Button = ({label, onClick} : Props) => {
    return (
        <button
            onClick={onClick}
            className={styles.button}
        >{label}</button>
    )
}
