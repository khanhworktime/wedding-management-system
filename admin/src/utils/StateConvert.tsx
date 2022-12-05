import React from 'react';
type stateType = { state: "unavailable" | "available" | "using" | "booked"; }

const StateConvert = (props: stateType)=>{
    const {state} = props;
    switch (state) {
        case "available":
            return <p className="font-semibold text-green-500">Hoạt động</p>
        case "unavailable":
            return <p className="font-semibold text-amber-700">Ngưng hoạt động</p>
        case "booked":
            return <p className="font-semibold text-teal-500">Đã được đặt</p>
        case "using":
            return <p className="font-semibold text-lime-300">Đang sử dụng</p>
    }
}

export default StateConvert;