
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import ICustomer from "../interface/ICustomer";
import store from "../store";
import {setBookingRecord} from "../store/reducers/bookingRecord";
import IBookingRecord from "../interface/IBookingRecord";

function getAllBookingRecord() {
    const getAll = () => axios.get("/booking_record", {
        baseURL: API_NAME
    })

    getAll().then(res => {
        store.dispatch(setBookingRecord(res.data));
    })
}

async function addBookingRecord(bookingRecord: IBookingRecord) {

    const addRecord = () => axios.post("/booking_record", {...bookingRecord}, {
        baseURL: API_NAME
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã thêm gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.message;
            }
        }
    })

    getAllBookingRecord()
}

async function confirmBookingRecord(bookingRecord: IBookingRecord) {

    const addRecord = () => axios.patch("/booking_record",{...bookingRecord, confirmed: true}, {
        baseURL: API_NAME,
        params: {
            id: bookingRecord.id
        }
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã thêm gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.message;
            }
        }
    })

    getAllBookingRecord()
}

export {getAllBookingRecord, addBookingRecord};