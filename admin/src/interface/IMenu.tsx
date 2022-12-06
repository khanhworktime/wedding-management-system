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
    other?: Array<any>,
    name: string;
    init?: boolean;
}

const initMenu:IMenu = {
    price: 0,
    state: "unavailable",
    name: "",
    soup: [],
    salad: [],
    main: [],
    dessert: [],
    other: [],
    init: true
}

const menuGetAdapterGroup=(groups:any)=>{
    if (groups.length === 0) return [];
    let dataSet = groups.map((item:any)=> {
        if (item.state !== "unavailable")
            return ({
                key: item._id,
                text: item.name,
                value: item._id
            })
    })
    dataSet = dataSet.filter((item:any)=> item !== undefined)
    console.log(dataSet)
    return dataSet
}

export default IMenu;
export {initMenu, menuGetAdapterGroup}