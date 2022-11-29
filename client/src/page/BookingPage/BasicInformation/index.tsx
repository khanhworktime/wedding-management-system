import { useState } from "react";
import Dropdown from '../../../components/Dropdown'
import styles from './styles.module.scss'
import ILounge , {fakeLounges} from '../../../interface/ILounge'
import LoadingScreen from "../../../components/LoadingScreen";

export default function BasicInformation(props:any){
    const {setData, setStep} = props;
    const guestAmountData = {
        value: ["100-200", "200-300", "300-400", "400-500"],
        content: ["Từ 100 đến 200 người", "Từ 200 đến 300 người", "Từ 300 đến 400 người", "Từ 400 đến 500 người"]
    }

    const loungeData = {
        value: fakeLounges.map((l:ILounge)=>l.id),
        content: fakeLounges.map((l:ILounge)=>l.name)
    }

    const [waiting, setWaiting] = useState(false);

    return <div>
        <h2 className="uppercase mb-4">Các thông tin của tiệc cưới</h2>

<form className={styles.booking}>
    <fieldset>
        <h3>Thông tin khách hàng</h3>
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
    <fieldset>
        <h3>Thông tin buổi tiệc</h3>
        <div className="flex items-center gap-4">
            <div className={styles.inputset}>
                <label>Ngày cưới</label>
                <input type="date" min={new Date().toISOString().slice(0, 10)}/>
            </div>
            <div className={styles.inputset}>
                <label>Số lượng khách mời dự kiến</label>
                <Dropdown className="h-full" option={guestAmountData}/>
            </div>

            <div className={styles.inputset}>
                <label>Sảnh cưới</label>
                <Dropdown className="h-full" option={loungeData}/>
            </div>
        </div>
    </fieldset>
    <fieldset className="flex justify-between">
        <button onClick={(e)=>{e.preventDefault(); }} className={styles.resetBtn}>Đặt lại</button>
        <button onClick={(e)=>{e.preventDefault(); setStep((prev:any) => prev + 1)}} className={styles.orderBtn}>Tiếp theo</button>
        {/* {waiting && <LoadingScreen/>} */}
    </fieldset>
</form>
    </div>
}