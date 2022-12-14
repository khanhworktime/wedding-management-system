interface ILounge {
    id: string;
    price: number;
    state: "available" | "booked" | "using" | "unavailable";
    capacity?: number;
    max_table: number;
    description?: string;
    name: string;
}

const fakeLounges : Array<ILounge> = [
    {
        id: "1",
        name: "Sảnh Đại tiệc Victoria",
        price: 10000000,
        state: "available",
        capacity: 100,
        max_table: 12
    },
    {
        id: "2",
        name: "Sảnh Đại tiệc CDB",
        price: 25000000,
        state: "using",
        capacity: 400,
        max_table: 45
    },
    {
        id: "3",
        name: "Sảnh Đại tiệc Cùng nhau",
        price: 50000000,
        state: "available",
        capacity: 400,
        max_table: 45
    },
    {
        id: "4",
        name: "Sảnh Đại tiệc Hoàng tộc",
        price: 120000000,
        state: "booked",
        capacity: 500,
        max_table: 600
    }
];

export default ILounge;
export {fakeLounges};