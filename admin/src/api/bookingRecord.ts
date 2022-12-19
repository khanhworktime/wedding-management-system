
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import ICustomer from "../interface/ICustomer";
import store from "../store";
import {setBookingRecord} from "../store/reducers/bookingRecord";
import IBookingRecord from "../interface/IBookingRecord";

function getAllBookingRecord() {
    const getAll = () => axios.get("/bookingRecords", {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    getAll().then(res => {
        store.dispatch(setBookingRecord(res.data.bookingRecords));
    })
}

async function addBookingRecord(bookingRecord: IBookingRecord) {

    const addRecord = () => axios.post("/bookingRecords", {...bookingRecord}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã thêm gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllBookingRecord()
}

async function confirmBookingRecord(bookingRecord: IBookingRecord) {

    const addRecord = () => axios.patch("/bookingRecords",{...bookingRecord, requestConfirm: true}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã thêm gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllBookingRecord()
}

async function deleteRecord(id: string) {

    const deleteRecords = () => axios.delete("/bookingRecords/" + id, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    return await toast.promise(deleteRecords, {
        pending: 'Đang xử lý...',
        success: {
            render(){
                return 'Đã xóa thành công'
            },

        },
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })
}

async function updateRecord(id: string | undefined, record: IBookingRecord){

    const updateRecord = () => axios.put("/bookingRecords/" + id,{...record}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    return await toast.promise(updateRecord, {
        pending: 'Đang xử lý...',
        success: {
            render(){
                return 'Đã cập nhật thành công'
            },

        },
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })
}

export {getAllBookingRecord, addBookingRecord, confirmBookingRecord, deleteRecord, updateRecord};