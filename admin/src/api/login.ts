
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'

type propsType = {
    username: string,
    pwd: string
}

export default async function login(props: propsType) {
    const {username, pwd} = props

    const loginAPI = () => axios.post("/admin/login", {username: props.username, password: props.pwd}, {
        baseURL: API_NAME.concat("/api/auth"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
        }
    })

    const fetch = await toast.promise(loginAPI, {
        pending: 'Logining in...',
        success: 'Logged in 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.message;
            }
        }
    })
    if (fetch.data.success) {
        localStorage.setItem("accessToken", fetch.data.accessToken)
        localStorage.setItem("username", fetch.data.username)
        return fetch.data.success;
    }
}

export const checkToken = async ()=>{
    const checkTokenAPI = () => axios.post("/checkToken", {username: localStorage.getItem('username'), accessToken: localStorage.getItem('accessToken')},{
        baseURL: API_NAME.concat("/api/auth"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
        }
    })
    let response = await checkTokenAPI()
    return response.data.success
}