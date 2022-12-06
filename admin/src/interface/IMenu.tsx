import IDish from "./IDish";

interface IMenu {
    _id?: string;
    price: number;
    description?: string;
    state: "available" | "unavailable";
    dishes: Array<IDish> | null;
    name: string;
}

const initService:IMenu = {
    price: 0,
    state: "unavailable",
    name: "",
    dishes: null
}


export default IMenu;