
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import store from "../store";
import {setBookingRecord} from "../store/reducers/bookingRecord";
import ILounge from "../interface/ILounge";

function getAllLounge() {
    const getAll = () => axios.get("/lounges", {
        baseURL: API_NAME.concat("/api")
    })

    getAll().then(res => {
        store.dispatch(setBookingRecord(res.data));
    })
}

async function addLounge(lounge: ILounge) {

    const addRecord = () => axios.post("/lounges", {...lounge}, {
        baseURL: API_NAME.concat("/api")
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

    getAllLounge()
}

export {getAllLounge, addLounge};