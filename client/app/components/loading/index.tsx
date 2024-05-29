import styles from './styles.module.css';

export const Loading = ({containerClassName = ''}) => {
    return (
        <div className={styles.container + ' ' + containerClassName}>
            <span className={styles.loader}></span>
        </div>
    )
}
