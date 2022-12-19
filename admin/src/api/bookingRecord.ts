
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

    const addRecord = () => axios.put("/bookingRecords/" + bookingRecord._id,{...bookingRecord, option: {requestConfirm: true}}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã chuyển trạng thái xác nhận rồi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllBookingRecord()
}
async function cancelBookingRecord(bookingRecord: IBookingRecord) {

    const addRecord = () => axios.put("/bookingRecords/" + bookingRecord._id,{...bookingRecord, option: {requestCancel: true}}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã hủy tiệc 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllBookingRecord()
}
async function confirmBookingContract(bookingRecord: IBookingRecord) {

    const addRecord = () => axios.put("/bookingRecords/" + bookingRecord._id,{...bookingRecord, option: {requestConfirmContract: true}}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã xác nhận hợp đồng tiệc 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllBookingRecord()
}
async function cancelBookingContract(bookingRecord: IBookingRecord) {

    const addRecord = () => axios.put("/bookingRecords/" + bookingRecord._id,{...bookingRecord, option: {requestCancelContract: true}}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã hủy hợp đồng tiệc 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllBookingRecord()
}
async function addBookingContract(bookingRecord: IBookingRecord) {

    const addRecord = () => axios.put("/bookingRecords/" + bookingRecord._id,{...bookingRecord, option: {requestDeposite: true}}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã cọc gồi 👌',
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

export {getAllBookingRecord, addBookingRecord, confirmBookingRecord, cancelBookingContract, deleteRecord, updateRecord, cancelBookingRecord, confirmBookingContract};