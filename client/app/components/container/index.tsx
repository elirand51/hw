import {Header} from "@/app/components/header";
import styles from './styles.module.css';

type tContainer = {
    header: string,
    children: React.ReactNode
}
export const Container = ({header, children} : tContainer) => {
    return (
        <div
            className={styles.container}
        >
            <Header header={header}/>
            <div className={styles.children_wrapper}>
                {children}
            </div>
        </div>
    )
}
