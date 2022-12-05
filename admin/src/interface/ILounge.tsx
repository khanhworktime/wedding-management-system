interface ILounge {
    _id?: string;
    price: number;
    state: "available" | "booked" | "using" | "unavailable";
    capacity: number;
    max_table: number;
    description?: string;
    position?: string;
    name: string;
}

const initLounge:ILounge = {
    name: "",
    state: "unavailable",
    capacity: 0,
    max_table: 0,
    price: 0
}

const fakeLounges : Array<ILounge> = [
    {
        name: "Sảnh Đại tiệc Victoria",
        price: 10000000,
        state: "available",
        capacity: 100,
        max_table: 12
    },
    {
        name: "Sảnh Đại tiệc CDB",
        price: 25000000,
        state: "using",
        capacity: 400,
        max_table: 45
    },
    {
        name: "Sảnh Đại tiệc Cùng nhau",
        price: 50000000,
        state: "available",
        capacity: 400,
        max_table: 45
    },
    {
        name: "Sảnh Đại tiệc Hoàng tộc",
        price: 120000000,
        state: "booked",
        capacity: 500,
        max_table: 600
    }
];

export default ILounge;
export {fakeLounges, initLounge};