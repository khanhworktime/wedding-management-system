import React from 'react';
type stateType = { state: "unavailable" | "available" | "using" | "booked" |'init' | 'confirmed' | 'contract confirmed' | 'deposited' | 'paid' | 'processing' | 'finished' }

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
        case "init" :
            return <p className="font-semibold text-green-300">Khởi tạo</p>
        case "confirmed" :
            return <p className="font-semibold text-green-500">Đã xác nhận</p>
        case "contract confirmed" :
            return <p className="font-semibold text-green-700">Đã ký hợp đồng</p>
        case "deposited" :
            return <p className="font-semibold text-teal-300">Đã trả cọc</p>
        case "paid" :
            return <p className="font-semibold text-teal-500">Đã thanh toán</p>
        case "processing" :
            return <p className="font-semibold text-green-500">Đang diễn ra</p>
        case "finished" :
            return <p className="font-semibold text-green-700">Kết thúc</p>
        default:
            return <p></p>
    }
}

export default StateConvert;