import { useState } from "react";
import Dropdown from '../../../components/Dropdown'
import styles from './styles.module.scss'
import ILounge , {fakeLounges} from '../../../interface/ILounge'
import LoadingScreen from "../../../components/LoadingScreen";
import IMenu, {fakeMenu} from "../../../interface/IMenu";
import MenuItem from "./MenuItem";

export default function MenuSelector(props:any){
    const {setData, setStep} = props

    const menus = fakeMenu;
    return <div>
    <h2 className="uppercase mb-4">Chọn Menu món ăn</h2>

    <form className={styles.booking}>
    <fieldset>
        <h3>Các gói Menu nổi bật</h3>
        <div className="flex mt-10 flex-wrap gap-10">
            {
                menus.map((menu:IMenu) => {
                    return <MenuItem item={menu}/>
                })
            }
        </div>
    </fieldset>
    <fieldset className="flex mt-8 justify-between">
        <button onClick={(e)=>{e.preventDefault(); }} className={styles.resetBtn}>Đặt lại</button>
        <div className="flex gap-4">
            <button onClick={(e)=>{e.preventDefault(); setStep((prev:any) => prev - 1)}} className={styles.backBtn}>Trở lại</button>
            <button onClick={(e)=>{e.preventDefault(); setStep((prev:any) => prev + 1)}} className={styles.orderBtn}>Tiếp theo</button>
        </div>
        {/* {waiting && <LoadingScreen/>} */}
    </fieldset>
    </form>
</div>

}