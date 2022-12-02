import { useState } from "react";
import Dropdown from '../../../components/Dropdown'
import styles from './styles.module.scss'
import ILounge , {fakeLounges} from '../../../interface/ILounge'
import LoadingScreen from "../../../components/LoadingScreen";
import IBookingRecord from "../../../interface/IBookingRecord";

export default function BasicInformation(props:any){
    const {setData, setStep, data} = props;
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
                <input value={data.customer.name} onChange={(e)=>{setData((prev:IBookingRecord)=>{return {...prev, customer: {...prev.customer, name: e.target.value}}})}} type="name"/>
            </div>
            <div className={styles.inputset}>
                <label>Số điện thoại</label>
                <input value={data.customer.phone_number} onChange={(e)=>{console.log(data); setData((prev:IBookingRecord)=>{return {...prev, customer: {...prev.customer, phone_number: e.target.value}}})}} type="tel"/>
            </div>
            <div className={styles.inputset}>
                <label>Email</label>
                <input value={data.customer.email} onChange={(e)=>{setData((prev:IBookingRecord)=>{return {...prev, customer: {...prev.customer, email: e.target.value}}})}} type="email"/>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <h3>Thông tin cô dâu và chú rể</h3>
        <div className="flex items-center gap-4">
            <div className={styles.inputset}>
                <label>Tên cô dâu</label>
                <input value={data.host.bride.name} onChange={(e)=>{setData((prev:IBookingRecord)=>{return {...prev, host: {...prev.host, bride : { ...prev.host.bride, name : e.target.value}}}})}} type="name"/>
            </div>
            <div className={styles.inputset}>
                <label>Năm sinh</label>
                <input value={data.host.bride.born_year} onChange={(e)=>{setData((prev:IBookingRecord)=>{return {...prev, host: {...prev.host, bride : { ...prev.host.bride, born_year : e.target.value}}}})}} type="month"/>
            </div>

            <div className={styles.emSymbol}>&</div>

            <div className={styles.inputset}>
                <label>Tên chú rể</label>
                <input value={data.host.groom.name} onChange={(e)=>{setData((prev:IBookingRecord)=>{return {...prev, host: {...prev.host, groom : { ...prev.host.groom, name : e.target.value}}}})}} type="name"/>
            </div>
            <div className={styles.inputset}>
                <label>Năm sinh</label>
                <input value={data.host.groom.born_year} onChange={(e)=>{setData((prev:IBookingRecord)=>{return {...prev, host: {...prev.host, groom : { ...prev.host.groom, born_year : e.target.value}}}})}} type="month"/>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <h3>Thông tin buổi tiệc</h3>
        <div className="flex items-center gap-4">
            <div className={styles.inputset}>
                <label>Ngày cưới</label>
                <input onChange={(e)=>{setData((prev:IBookingRecord)=>{return {...prev, wed_date: e.target.value}})}} type="date" min={new Date().toISOString().slice(0, 10)}/>
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