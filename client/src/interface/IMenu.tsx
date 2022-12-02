import IDish, {fakeDishes} from "./IDish";

interface IMenu {
    id: string;
    price: number;
    description: string;
    state: "available" | "unavailable";
    dishes: Array<IDish>;
    name: string;
}

export const fakeMenu:Array<IMenu> = [
    {
        id: "MN01",
        price: 1000000,
        description: "Menu 01",
        state: "available",
        dishes: fakeDishes.slice(0, 3),
        name: "Menu 01"
    },{
        id: "MN02",
        price: 1000000,
        description: "Menu 02",
        state: "available",
        dishes: fakeDishes.slice(0, 2),
        name: "Menu 02"
    },{
        id: "MN03",
        price: 1000000,
        description: "Menu 03",
        state: "available",
        dishes: fakeDishes.slice(1, 3),
        name: "Menu 03"
    }
]

export default IMenu;