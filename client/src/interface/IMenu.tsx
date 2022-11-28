import IDish from "./IDish";

interface IMenu {
    id: string;
    price: number;
    description: string;
    state: "available" | "unavailable";
    dishes: Array<IDish>;
    name: string;
}

export default IMenu;