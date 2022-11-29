import {API_NAME} from './env'
import axios from 'axios'

type propsType = {
    username: string,
    pwd: string
}

export default function login(props:propsType){
    axios.post("/login", {username: props.username, password: props.pwd}, {
        baseURL: API_NAME.concat("/api/auth")
    })
    .then((res:any)=>{
        console.log(res);
        
        localStorage.setItem("accessToken", res.data.accessToken)
    })
}
