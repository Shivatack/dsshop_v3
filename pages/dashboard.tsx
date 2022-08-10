import Header from '../components/header';
import styles from '../styles/Home.module.css';

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <Header />
            <p>Connected!</p>
        </div>
    )
}
