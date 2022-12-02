
import IMenu from "../../../../interface/IMenu";
import styles from "./styles.module.scss"

type propsType = {
    item: IMenu
}
export default function MenuItem(props:propsType){
    const {item} = props
    return <div className={styles.menuItem}>
        <p className={styles.name}>{item.name}</p>
    </div>
}