import React, {useState} from 'react';
import {Tab} from 'semantic-ui-react'
import {BsPlus} from "react-icons/bs";

//TODO: add tabs


const DataUpdate = () => {

    const [openModal, setOpenModal] = useState(false)

    const panes = [
        { menuItem: 'Sảnh cưới', render: () => <Tab.Pane>
                <h1 className="text-2xl font-bold">Các sảnh cưới</h1>
                <p className="mb-6">Hiện có : 0 sảnh cưới</p>
                <div onClick={()=>setOpenModal(true)} className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"><BsPlus/> Thêm sảnh mới</div>

                <div className="flex flex-row gap-10 w-full h-[70vh]">
                    <div className="h-full basis-2/3 overflow-y-scroll">
                        <table className="w-full table-auto h-fit border-collapse relative">
                            <thead>
                            <tr>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Mã sảnh</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Tên sảnh</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Vị trí</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Sức chứa</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Số bàn</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Trạng thái</th>
                                <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Thao tác</th>
                            </tr>
                            </thead>
                            <tbody className="">
                            <tr className="hover:bg-cyan-200 even:bg-cyan-100 transition-colors cursor-pointer">
                                <td className="py-4 px-2 font-semibold">#S023</td>
                                <td className="py-4 px-2">Sảnh Victorial</td>
                                <td className="py-4 px-2">Lầu 1, Khu VIP</td>
                                <td className="py-4 px-2">400 người</td>
                                <td className="py-4 px-2">45 bàn</td>
                                <td className="py-4 px-2">Hoạt động</td>
                                <td className="py-4 px-2">Buttonx2</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="basis-1/3 h-full">
                        <h3 className="text-xl font-semibold">Chi tiết</h3>
                    </div>
                </div>
            </Tab.Pane> },
        { menuItem: 'Menu và món ăn', render: () => <Tab.Pane>

            </Tab.Pane> },
        { menuItem: 'Dịch vụ', render: () => <Tab.Pane>

            </Tab.Pane> },
    ]
    return (
        <Tab panes={panes}/>
    );
};

export default DataUpdate;