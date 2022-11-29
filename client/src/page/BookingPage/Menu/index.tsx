import { useState } from "react";
import Dropdown from '../../../components/Dropdown'
import styles from './styles.module.scss'
import ILounge , {fakeLounges} from '../../../interface/ILounge'
import LoadingScreen from "../../../components/LoadingScreen";

export default function MenuSelector(props:any){
    const {setData, setStep} = props
    return <div>
    <h2 className="uppercase mb-4">Chọn Menu món ăn</h2>

    <form className={styles.booking}>
    <fieldset>
        <h3>Các gói Menu nổi bật</h3>
        <div className="flex gap-4">
            <div className={styles.inputset}>
                <label>Họ và tên</label>
                <input type="name"/>
            </div>
            <div className={styles.inputset}>
                <label>Số điện thoại</label>
                <input type="tel"/>
            </div>
            <div className={styles.inputset}>
                <label>Email</label>
                <input type="email"/>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <h3>Thông tin cô dâu và chú rể</h3>
        <div className="flex items-center gap-4">
            <div className={styles.inputset}>
                <label>Tên cô dâu</label>
                <input type="name"/>
            </div>
            <div className={styles.inputset}>
                <label>Năm sinh</label>
                <input type="month"/>
            </div>

            <div className={styles.emSymbol}>&</div>

            <div className={styles.inputset}>
                <label>Tên chú rể</label>
                <input type="name"/>
            </div>
            <div className={styles.inputset}>
                <label>Năm sinh</label>
                <input type="month"/>
            </div>
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