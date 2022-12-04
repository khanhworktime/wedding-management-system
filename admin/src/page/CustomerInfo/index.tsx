import React, {useState} from 'react';
import {BsPlus} from "react-icons/bs";
import Modal from "../../components/Modal";

const CustomerInfo = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="flex flex-col flex-wrap gap-6 bg-white p-6 rounded-md relative">
            {openModal && <Modal showHandler={setOpenModal}>
                <h2 className="font-semibold mb-4">Thêm khách hàng mới</h2>
                <form>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Tên khách hàng</label>
                        <input type="text" className="bg-white border-slate-500 p-2 rounded-md border-2"/>
                    </fieldset>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Số chứng chỉ công dân</label>
                        <input type="text" className="bg-white border-slate-500 p-2 rounded-md border-2"/>
                    </fieldset>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Năm sinh</label>
                        <input type="date" className="bg-white border-slate-500 p-2 rounded-md border-2"/>
                    </fieldset>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Email</label>
                        <input type="text" className="bg-white border-slate-500 p-2 rounded-md border-2"/>
                    </fieldset>
                    <fieldset className="flex flex-col gap-2 mb-4">
                        <label>Địa chỉ</label>
                        <input type="text" className="bg-white border-slate-500 p-2 rounded-md border-2"/>
                    </fieldset>
                    <fieldset className="flex flex-row gap-2 mb-4">
                        <label>Tạo tài khoản mới ?</label>
                        <input type="checkbox"/>
                    </fieldset>
                    <div className="flex w-full gap-4 justify-end">
                        <div onClick={()=>setOpenModal(false)} className="p-2 cursor-pointer rounded-md border-amber-600 border-2">Hủy</div>
                        <div className="p-2 rounded-md bg-indigo-800 text-white cursor-pointer">Thêm mới</div>
                    </div>
                </form>
            </Modal>}

            <h1 className="text-2xl font-bold mb-6">Khách hàng</h1>
            <div onClick={()=>setOpenModal(true)} className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"><BsPlus/> Thêm khách hàng</div>

            <table className="table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Mã KH</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Tên KH</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Chứng chỉ công dân</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Địa chỉ</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Số tiệc đã đặt</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-cyan-200 even:bg-cyan-100 transition-colors cursor-pointer">
                        <td className="py-4 px-2 font-semibold">#asdasdasd</td>
                        <td className="py-4 px-2">Nguyễn Văn A</td>
                        <td className="py-4 px-2">234234234332</td>
                        <td className="py-4 px-2">102 sakdj, sjadkasd, ĐS</td>
                        <td className="py-4 px-2">102</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CustomerInfo;