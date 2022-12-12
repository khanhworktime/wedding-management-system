
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import ICustomer from "../interface/ICustomer";
import store from "../store";
import {setCustomers} from "../store/reducers/customer";

async function getAllCustomer() {
    const getAll = () => axios.get("/customers", {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    let response = await getAll();
    return response.data.customers;
}

async function addNewCustomer(customer: ICustomer) {

    const addCustomer = () => axios.post("/customers", {...customer}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    return await toast.promise(addCustomer, {
        pending: 'Đang xử lý...',
        success: {
            render(){
                return 'Đã thêm gồi á 👌'
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

export {addNewCustomer, getAllCustomer};