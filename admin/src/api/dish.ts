
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import store from "../store";
import {setService} from "../store/reducers/service";
import IService from "../interface/IService";
import {setDish} from "../store/reducers/dish";
import IDish from "../interface/IDish";
import { updateService } from "./service";

function getAllDishes() {
    const getAll = () => axios.get("/dishes", {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    getAll().then(res => {
        console.log(res)
        store.dispatch(setDish(res.data.dishes));
    })
}

async function addDish(dish: IDish) {

    const add = () => axios.post("/dishes", {...dish}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(add, {
        pending: 'Đang xử lý...',
        success: 'Đã thêm gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllDishes()

    return fetch.data.success
}

async function updateDish(dish: IDish) {

    const update = () => axios.put("/dishes/" + dish._id, {...dish}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(update, {
        pending: 'Đang xử lý...',
        success: 'Đã cập nhật gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllDishes()

    return fetch.data.success
}

async function deleteDish(id: string) {

    const deleteItem = () => axios.delete("/dishes/"+id, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(deleteItem, {
        pending: 'Đang xử lý...',
        success: 'Đã xóa xong ✔',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllDishes()

    return fetch.data.success
}

export {getAllDishes, addDish, deleteDish, updateDish};