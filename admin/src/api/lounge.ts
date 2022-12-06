
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import store from "../store";
import {setBookingRecord} from "../store/reducers/bookingRecord";
import ILounge from "../interface/ILounge";
import {setLounge} from "../store/reducers/lounge";

function getAllLounge() {
    const getAll = () => axios.get("/lounges", {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    getAll().then(res => {
        store.dispatch(setLounge(res.data.lounges || []));
    })
}

async function addLounge(lounge: ILounge) {

    const addRecord = () => axios.post("/lounges", {...lounge}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(addRecord, {
        pending: 'Đang xử lý...',
        success: 'Đã thêm gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllLounge()

    return fetch.data.success
}

async function updateLounge(lounge: ILounge) {

    const updateLounge = () => axios.put("/lounges/" + lounge._id, {...lounge}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(updateLounge, {
        pending: 'Đang xử lý...',
        success: 'Đã cập nhật gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllLounge()

    return fetch.data.success
}

async function deleteLounge(id: string) {

    const deleteLounge = () => axios.delete("/lounges/"+id, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(deleteLounge, {
        pending: 'Đang xử lý...',
        success: 'Đã xóa xong ✔',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllLounge()

    return fetch.data.success
}

export {getAllLounge, addLounge, deleteLounge, updateLounge};