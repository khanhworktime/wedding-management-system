import IDish from "./IDish";

interface IMenu {
    _id?: string;
    price?: number;
    description?: string;
    state: "available" | "unavailable";
    soup?: Array<any>,
    salad?: Array<any>,
    main?: Array<any>,
    dessert?: Array<any>,
    orther?: Array<any>,
    name: string;
}

const initMenu:IMenu = {
    price: 0,
    state: "unavailable",
    name: "",
    soup: [],
    salad: [],
    main: [],
    dessert: [],
    orther: [],
}

const menuGetAdapterGroup=(groups:any)=>{
    return groups.map((item:any)=>({
        key: item._id,
        text: item.name,
        value: item._id
    }))
}

export default IMenu;
export {initMenu, menuGetAdapterGroup}