
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import store from "../store";
import {setService} from "../store/reducers/service";
import IService from "../interface/IService";

function getAllService() {
    const getAll = () => axios.get("/services", {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    getAll().then(res => {
        store.dispatch(setService(res.data.services));
    })
}

async function addService(service: IService) {

    const addService = () => axios.post("/services", {...service}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(addService, {
        pending: 'Đang xử lý...',
        success: 'Đã thêm gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllService()

    return fetch.data.success
}

async function updateService(service: IService) {

    const updateService = () => axios.put("/services/" + service._id, {...service}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(updateService, {
        pending: 'Đang xử lý...',
        success: 'Đã cập nhật gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllService()

    return fetch.data.success
}

async function deleteService(id: string) {

    const deleteService = () => axios.delete("/services/"+id, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(deleteService, {
        pending: 'Đang xử lý...',
        success: 'Đã xóa xong ✔',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllService()

    return fetch.data.success
}

export {getAllService, addService, deleteService, updateService};