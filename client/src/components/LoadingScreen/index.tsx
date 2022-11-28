import styles from './styles.module.scss'
import {gif} from "../../asset/imgGetter";

export default function LoadingScreen(){

    return <div className={styles.loadingScreen}>
        <img className={styles.circle} src={gif.loading}/>
    </div>
}