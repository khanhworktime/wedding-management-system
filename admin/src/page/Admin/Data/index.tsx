import React, {useEffect, useState} from 'react';
import {Button, Input, Tab} from 'semantic-ui-react'
import {BsPlus} from "react-icons/bs";
import {Modal} from "semantic-ui-react";
import CustomModal from "../../../components/CustomModal";
import ILounge, {initLounge} from "../../../interface/ILounge";
import {addLounge, deleteLounge, getAllLounge} from "../../../api/lounge";
import {useSelector} from "react-redux";
import {loungesSelector} from "../../../store/reducers/lounge";
import {toast} from "react-toastify";

//TODO: add tabs

const TabLounge = () => {
    const lounges = useSelector(loungesSelector);
    const [newLounge, setNewLounge] = useState({});
    const [openModal, setOpenModal] = useState(false)
    const [formErr, setErr] = useState({
        error: true,
        nameErr: true,
        capacityErr: true,
        tableErr: true,
        priceErr: true,
        errMsg: "Điền đầy đủ các trường thông tin !",
    })

    const [confirmModal, setOpenConfirm] = useState({state: false, loungeId: ""})

    const formErrValidate = formErr.nameErr || formErr.capacityErr || formErr.tableErr || formErr.priceErr

    const formValidate = () => {
        if (!formErr.error) {
            addLounge({
                capacity: 0,
                max_table: 0,
                name: "",
                price: 0,
                state: "unavailable", ...newLounge
            }).then((res) => {
                if (res) setOpenModal(false)
            })
        }
        else toast.error(formErr.errMsg);
    }

    return <Tab.Pane>
            <Modal size={"tiny"} open={confirmModal.state} onClose={()=>setOpenConfirm({state: false, loungeId: ""})}>
                <Modal.Header>Xóa sảnh cưới ?</Modal.Header>
                <Modal.Content>Sảnh sẽ được xóa !?</Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={()=>setOpenConfirm({state: false, loungeId: ""})}>Không</Button>
                    <Button positive onClick={()=> {
                        deleteLounge(confirmModal.loungeId).then(r => setOpenConfirm({state: false, loungeId: ""})
                    )}}>Xóa</Button>
                </Modal.Actions>
            </Modal>
            {openModal && <CustomModal showHandler={setOpenModal}>
            <h2 className="font-semibold mb-4">Thêm sảnh mới</h2>
            <div>
                <div className="flex flex-col gap-2 mb-4 required field">
                    <label>Tên sảnh*</label>
                    <Input required error={formErr.nameErr} onChange={(e)=> {
                        setErr(prevState => (e.target.value.length !== 0 ? {...prevState,error: formErrValidate, nameErr: false} : {...prevState, error: true, nameErr: true}))
                        setNewLounge((prev: any) => {
                            return {
                                ...
                                    prev, name: e.target.value
                            }
                    })}} type="text"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Vị trí sảnh</label>
                    <Input onChange={(e)=> {
                        setNewLounge((prev: ILounge) => ({...prev, position: e.target.value}))
                    }} type="text"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Sức chứa*</label>
                    <Input required error={formErr.capacityErr} onChange={(e)=> {
                        setErr(prevState => (e.target.value.length !== 0 ? {...prevState,error: formErrValidate, capacityErr: false} : {...prevState, error: true, capacityErr: true}))
                        setNewLounge((prev: any) => {
                            return {...prev, capacity: parseInt(e.target.value)
                            }
                        })}} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Số bàn*</label>
                    <Input required error={formErr.tableErr} onChange={(e)=> {
                        setErr(prevState => (e.target.value.length !== 0 ? {...prevState,error: formErrValidate, tableErr: false} : {...prevState, error: true, tableErr: true}))
                        setNewLounge((prev: any) => {
                            return {...prev, max_table: parseInt(e.target.value)}
                        })}} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Giá đặt sảnh*</label>
                    <Input required error={formErr.priceErr} onChange={(e)=> {
                        setErr(prevState => (e.target.value.length !== 0 ? {...prevState,error: formErrValidate, priceErr: false} : {...prevState, error: true, priceErr: true}))
                        setNewLounge((prev: any) => {
                            return {
                                ...
                                    prev, price: parseFloat(e.target.value)
                            }
                        })}} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Mô tả</label>
                    <Input onChange={(e)=> setNewLounge((prev:ILounge)=> {
                        return{...
                            prev, description:e.target.value
                        }
                    })} type="text"/>
                </div>
                <div className="flex w-full gap-4 justify-end">
                    <Button onClick={(e)=> {
                        setOpenModal(false)
                    }}>Hủy</Button>
                    <Button onClick={(e)=> {
                        formValidate()
                    }} primary>Thêm mới</Button>
                </div>
            </div>
        </CustomModal>}
        <h1 className="text-2xl font-bold mt-0">Các sảnh cưới</h1>
        <p className="mb-6">Hiện có : 0 sảnh cưới</p>
        <div onClick={() => setOpenModal(true)}
             className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer">
            <BsPlus/> Thêm sảnh mới
        </div>

        <div className="flex flex-row gap-10 w-full h-[70vh]">
            <div className="h-full basis-2/3 overflow-y-scroll">
                <table className="w-full table-auto h-fit border-collapse relative">
                    <thead>
                    <tr>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Mã
                            sảnh
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Tên
                            sảnh
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Vị
                            trí
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Sức
                            chứa
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Số
                            bàn
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Trạng
                            thái
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Thao
                            tác
                        </th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {
                        lounges.map(((lounge:ILounge, i: number) => {
                            return (
                                <tr key={`Lounge${i}`} className="hover:bg-cyan-200 even:bg-cyan-100 transition-colors cursor-pointer">
                                    <td className="py-4 px-2 font-semibold">{lounge._id}</td>
                                    <td className="py-4 px-2">{lounge.name}</td>
                                    <td className="py-4 px-2">{lounge.position ? lounge.position : ""}</td>
                                    <td className="py-4 px-2">{lounge.capacity}</td>
                                    <td className="py-4 px-2">{lounge.max_table}</td>
                                    <td className="py-4 px-2">{lounge.state}</td>
                                    <td className="py-4 px-2"><Button onClick={()=>setOpenConfirm({state: true, loungeId: lounge._id ? lounge._id : ""})} primary>Xóa</Button></td>
                                </tr>
                            )
                        }))
                    }
                    </tbody>
                </table>
            </div>
            <div className="basis-1/3 h-full">
                <h3 className="text-xl font-semibold">Chi tiết</h3>
            </div>
        </div>
    </Tab.Pane>
}

const DataUpdate = () => {

    useEffect(()=>{getAllLounge()})

    const panes = [
        { menuItem: 'Sảnh cưới', render: () => <TabLounge/>},
        { menuItem: 'Menu và món ăn', render: () => <Tab.Pane>

            </Tab.Pane> },
        { menuItem: 'Dịch vụ', render: () => <Tab.Pane>

            </Tab.Pane> },
    ]


    return (
        <div>
            <Tab panes={panes}/>
        </div>
    );
};

export default DataUpdate;