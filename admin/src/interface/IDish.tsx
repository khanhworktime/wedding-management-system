interface IDish{
    _id?:string;
    description?:string;
    state: "available" | "unavailable";
    name: string;
    price: number;
    order: "Soup" | "Salad" | "Món chính" | "Tráng miệng" | "Khác";
    type: "Món mặn" | "Món chay" | "Đồ ngọt" | "Lẩu" | "Khác";
}

const dishOrderAdapter = [
    {
        text: "Soup",
        value: "Soup"
    },{
        text: "Món chính",
        value: "Món chính"
    },{
        text: "Salad",
        value: "Salad"
    },{
        text: "Tráng miệng",
        value: "Tráng miệng"
    },{
        text: "Khác",
        value: "Khác"
    },
]

const dishTypeAdapter = [
    {
        text: "Món mặn",
        value: "Món mặn"
    },{
        text: "Món chay",
        value: "Món chay"
    },{
        text: "Đồ ngọt",
        value: "Đồ ngọt"
    },{
        text: "Lẩu",
        value: "Lẩu"
    },{
        text: "Khác",
        value: "Khác"
    },
]



const initDish:IDish = {
    name: "",
    state: "unavailable",
    price: 0,
    order: "Khác",
    type: "Khác"
}

export default  IDish;
export {initDish, dishTypeAdapter, dishOrderAdapter}