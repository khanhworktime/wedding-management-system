
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
        baseURL: API_NAME.concat("/api/auth")
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
    if (fetch.status )
    localStorage.setItem("accessToken", fetch.data.accessToken)
}