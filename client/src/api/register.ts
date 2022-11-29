import {API_NAME} from './env'
import axios from 'axios'

type propsType = {
    username: string,
    pwd: string
}

export default function register(props:propsType){
    axios.post("/register", {username: props.username, password: props.pwd}, {
        baseURL: API_NAME.concat("/api/auth")
    })
    .then((res:any)=>{
        localStorage.setItem("accessToken", res.accessToken)
    })
}
