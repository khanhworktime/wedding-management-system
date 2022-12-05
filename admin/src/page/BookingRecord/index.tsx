import React, {useLayoutEffect, useState} from 'react';
import Modal from "../../components/CustomModal";
import {BsPlus} from "react-icons/bs";
import store from "../../store";
import {setPage} from "../../store/reducers/page";
import {Button, Dropdown, Input} from "semantic-ui-react";

//TODO: Config for new deal

const customerOpt = [
    {
        key: "customer01",
        text: "Nguyen Van A",
        value: "nva"
    },{
        key: "customer02",
        text: "Nguyen Van B",
        value: "nvb"
    },{
        key: "customer03",
        text: "Nguyen Van C",
        value: "nvc"
    },
]

const SaleDeal = () => {
    const [openModal, setOpenModal] = useState(false);
    useLayoutEffect(()=>{
        store.dispatch(setPage("sale_deals"))
    })

    return (
        <div className="bg-white p-6 rounded-md relative">
            {openModal && <Modal showHandler={setOpenModal}>
                <h2 className="font-semibold mb-4">Thêm đơn mới</h2>
                <form>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Chọn khách hàng</label>
                        <Dropdown placeholder="Chọn khách hàng" options={customerOpt} selection fluid/>
                    </fieldset>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Số chứng chỉ công dân</label>
                        <Input type="text"/>
                    </fieldset>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Năm sinh</label>
                        <Input type="date"/>
                    </fieldset>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Email</label>
                        <Input type="text"/>
                    </fieldset>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Địa chỉ</label>
                        <Input type="text"/>
                    </fieldset>
                    <fieldset className="flex flex-row gap-2 mb-4">
                        <label>Tạo tài khoản mới ?</label>
                        <Input type="checkbox"/>
                    </fieldset>
                    <div className="flex w-full gap-4 justify-end">
                        <Button onClick={()=>setOpenModal(false)} >Hủy</Button>
                        <Button onClick={(e)=>e.preventDefault()} primary>Thêm mới</Button>
                    </div>
                </form>
            </Modal>}

            <h1 className="text-2xl font-bold">Đơn đặt tiệc</h1>
            <p className="mb-6">Hiện có : 0 đơn đặt tiệc</p>
            <div onClick={()=>setOpenModal(true)} className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"><BsPlus/> Thêm đơn mới</div>

            <div className="flex flex-row gap-10 w-full h-[70vh]">
                <div className="h-full basis-2/3 overflow-y-scroll">
                    <table className="w-full table-auto h-fit border-collapse relative">
                        <thead>
                            <tr>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Mã tiệc</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Tên KH</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Ngày đặt</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Sảnh</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Ca</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Ngày diễn ra</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr className="hover:bg-cyan-200 even:bg-cyan-100 transition-colors cursor-pointer">
                                <td className="py-4 px-2 font-semibold">#asdasdasd</td>
                                <td className="py-4 px-2">Nguyễn Văn A</td>
                                <td className="py-4 px-2">Nov 23, 2022</td>
                                <td className="py-4 px-2">Sảnh Vicotria</td>
                                <td className="py-4 px-2">Chiều (14:00 - 22:00)</td>
                                <td className="py-4 px-2">Dec 23, 2022</td>
                                <td className="py-4 px-2">Chưa xác nhận</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="basis-1/3 h-full">
                    <h3 className="text-xl font-semibold">Chi tiết</h3>
                </div>
            </div>
        </div>
    );
};

export default SaleDeal;