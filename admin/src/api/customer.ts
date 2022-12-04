
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import ICustomer from "../interface/ICustomer";
import store from "../store";
import {setCustomers} from "../store/reducers/customer";

function getAllCustomer() {
    const getAll = () => axios.get("/customer", {
        baseURL: API_NAME
    })

    getAll().then(res => {
        store.dispatch(setCustomers(res.data));
    })
}

async function addNewCustomer(customer: ICustomer) {

    const addCustomer = () => axios.post("/customer", {...customer}, {
        baseURL: API_NAME
    })

    await toast.promise(addCustomer, {
        pending: 'Đang xử lý...',
        success: 'Đã thêm gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.message;
            }
        }
    })

    getAllCustomer()
}

export {addNewCustomer, getAllCustomer};