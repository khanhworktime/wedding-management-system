
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {API_NAME} from './env'
import store from "../store";
import IMenu from "../interface/IMenu";
import {setMenu} from "../store/reducers/menu";

function getAllMenu() {
    const getAll = () => axios.get("/menus", {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    getAll().then(res => {
        store.dispatch(setMenu(res.data.menus || []));
    })
}

async function addMenu(menu: IMenu) {

    const addRecord = () => axios.post("/menus", {...menu}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
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

    getAllMenu()

    return fetch.data.success
}

async function updateMenu(menu: IMenu) {

    const updateMenu = () => axios.put("/menus/" + menu._id, {...menu}, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(updateMenu, {
        pending: 'Đang xử lý...',
        success: 'Đã cập nhật gòi á 👌',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllMenu()

    return fetch.data.success
}

async function deleteMenu(id: string) {

    const deleteMenu = () => axios.delete("/menus/"+id, {
        baseURL: API_NAME.concat("/api"),
        headers: {
            ['ngrok-skip-browser-warning']:"1",
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    const fetch = await toast.promise(deleteMenu, {
        pending: 'Đang xử lý...',
        success: 'Đã xóa xong ✔',
        error: {
            render({data}){
                // @ts-ignore
                return data.response.data.message;
            }
        }
    })

    getAllMenu()

    return fetch.data.success
}

export {getAllMenu, addMenu, deleteMenu, updateMenu};