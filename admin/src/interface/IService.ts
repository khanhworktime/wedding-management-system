import {serviceType} from "../utils/serviceType";

interface IService {
    _id?: string;
    price: number;
    state: "available"|"unavailable";
    description?: string;
    name: string;
    type: "party_setup" | "audition" | "invitation" | "clothes" | "makeup" | "video_shot" | "controller" | "others";
    promotion?: string;
    init?: boolean;
}

const typeAdapter = [
    {
        key: "party_setup",
        text: serviceType("party_setup"),
        value: "party_setup"
    },
    {
        key: "audition",
        text: serviceType("audition"),
        value: "audition"
    },
    {
        key: "invitation",
        text: serviceType("invitation"),
        value: "invitation"
    },
    {
        key: "clothes",
        text: serviceType("clothes"),
        value: "clothes"
    },
    {
        key: "makeup",
        text: serviceType("makeup"),
        value: "makeup"
    },
    {
        key: "video_shot",
        text: serviceType("video_shot"),
        value: "video_shot"
    },
    {
        key: "controller",
        text: serviceType("controller"),
        value: "controller"
    },
    {
        key: "others",
        text: serviceType("others"),
        value: "others"
    },
]
const initService:IService = {
    price: 0,
    type: "others",
    state: "unavailable",
    name: "",
    init: true
}

export {initService, typeAdapter};
export default IService;