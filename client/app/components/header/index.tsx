import styles from './styles.module.css';

export const Header = ({header} : {header: string}) => {
    return (
        <h1 className={styles.h1}>{header}</h1>
    )
}
