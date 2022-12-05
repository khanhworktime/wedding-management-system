import React, {useEffect, useState} from 'react';
import {Button, Input, Tab, Transition} from 'semantic-ui-react'
import {BsPlus} from "react-icons/bs";
import {Modal} from "semantic-ui-react";
import CustomModal from "../../../components/CustomModal";
import ILounge, {initLounge} from "../../../interface/ILounge";
import {addLounge, deleteLounge, getAllLounge, updateLounge} from "../../../api/lounge";
import {useSelector} from "react-redux";
import {loungesSelector} from "../../../store/reducers/lounge";
import {toast} from "react-toastify";
import StateConvert from "../../../utils/StateConvert";


const TabLounge = () => {
    const lounges = useSelector(loungesSelector);
    const [newLounge, setNewLounge] = useState(initLounge);
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
            if (editMode){
                updateLounge({...newLounge}).then((res) => {
                    if (res) setOpenModal(false)
                })
            } else {
                addLounge({...newLounge}).then((res) => {
                    if (res) setOpenModal(false)
                })
            }

        }
        else toast.error(formErr.errMsg);
    }

    const [currentLounge, chooseLounge] = useState((lounges.length > 0) ? lounges[0] : {});
    const [editMode, setEditMode] = useState(false)

    // @ts-ignore
    // @ts-ignore
    return <Tab.Pane>
            <Transition visible={confirmModal.state} animation='scale' duration={200}>
                <Modal dimmer="blurring" size={"tiny"} open={confirmModal.state} onClose={()=>setOpenConfirm({state: false, loungeId: ""})}>
                    <Modal.Header>Xóa sảnh cưới ?</Modal.Header>
                    <Modal.Content>Sảnh sẽ được xóa !?</Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={()=>setOpenConfirm({state: false, loungeId: ""})}>Không</Button>
                        <Button positive onClick={()=> {
                            deleteLounge(confirmModal.loungeId).then(r => {
                                chooseLounge({});
                                setOpenConfirm({state: false, loungeId: ""})
                            }
                        )}}>Xóa</Button>
                    </Modal.Actions>
                </Modal>
            </Transition>
            {openModal && <CustomModal showHandler={setOpenModal}>
            <h2 className="font-semibold mb-4">Thêm sảnh mới</h2>
            <div>
                <div className="flex flex-col gap-2 mb-4 required field">
                    <label>Tên sảnh*</label>
                    <Input value={newLounge.name} required error={formErr.nameErr} onChange={(e)=> {
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
                    <Input value={newLounge.position || ""} onChange={(e)=> {
                        setNewLounge((prev: ILounge) => ({...prev, position: e.target.value}))
                    }} type="text"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Sức chứa*</label>
                    <Input value={newLounge.capacity} required error={formErr.capacityErr} onChange={(e)=> {
                        setErr(prevState => (e.target.value.length !== 0 ? {...prevState,error: formErrValidate, capacityErr: false} : {...prevState, error: true, capacityErr: true}))
                        setNewLounge((prev: any) => {
                            return {...prev, capacity: parseInt(e.target.value)
                            }
                        })}} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Số bàn*</label>
                    <Input value={newLounge.max_table} required error={formErr.tableErr} onChange={(e)=> {
                        setErr(prevState => (e.target.value.length !== 0 ? {...prevState,error: formErrValidate, tableErr: false} : {...prevState, error: true, tableErr: true}))
                        setNewLounge((prev: any) => {
                            return {...prev, max_table: parseInt(e.target.value)}
                        })}} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Giá đặt sảnh*</label>
                    <Input value={newLounge.price} required error={formErr.priceErr} onChange={(e)=> {
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
                    <Input value={newLounge.description || ""} onChange={(e)=> setNewLounge((prev:ILounge)=> {
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
                    }} primary>{editMode ? "Sửa" : "Thêm mới"}</Button>
                </div>
            </div>
        </CustomModal>}
        <h1 className="text-2xl font-bold mt-0">Các sảnh cưới</h1>
        <p className="mb-6">Hiện có : {lounges.length} sảnh cưới</p>
        <div onClick={() => {
            setEditMode(false)
            setNewLounge(initLounge);
            setOpenModal(true)
        }}
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
                    </tr>
                    </thead>
                    <tbody className="">
                    {
                        lounges.map(((lounge:ILounge, i: number) => {
                            return (
                                <tr onClick={()=>{chooseLounge(lounge)}} key={`Lounge${i}`} className="hover:bg-cyan-200 even:bg-cyan-100 transition-colors cursor-pointer">
                                    <td className="py-4 px-2 font-semibold">{lounge._id}</td>
                                    <td className="py-4 px-2">{lounge.name}</td>
                                    <td className="py-4 px-2">{lounge.position ? lounge.position : ""}</td>
                                    <td className="py-4 px-2">{lounge.capacity}</td>
                                    <td className="py-4 px-2">{lounge.max_table}</td>
                                    <td className="py-4 px-2"><StateConvert state={lounge.state}/></td>
                                </tr>
                            )
                        }))
                    }
                    </tbody>
                </table>
            </div>
            <div className="basis-1/3 h-full">
                <h3 className="text-xl font-semibold">Chi tiết</h3>
                <h4 className="text-lg mt-0 font-semibold">Sảnh {currentLounge.name}</h4>
                <p className="text-lg font-semibold">#{currentLounge._id}</p>
                <p><b>Trạng thái</b> : <StateConvert state={currentLounge.state || "unavailable"}/> </p>
                <p><b>Sức chứa của sảnh</b> : {currentLounge.capacity} khách</p>
                <p><b>Số lượng bàn tối đa</b> : {currentLounge.max_table}</p>
                <p><b>Vị trí trong tòa nhà</b> : {currentLounge.position || ""}</p>
                <p><b>Mô tả</b> : {currentLounge.description || ""}</p>
                <p><b>Thao tác:</b></p>
                <div className="flex flex-row gap-2">
                    <Button primary onClick={()=>{
                        setEditMode(true);
                        setNewLounge(currentLounge);
                        setOpenModal(true)
                    }}>Sửa</Button>
                    <Button onClick={()=>setOpenConfirm({state: true, loungeId: currentLounge._id})} color="red">Xóa</Button>
                    {currentLounge.state === "unavailable" && <Button color={"green"} onClick={()=>{updateLounge({...currentLounge,
                         state: "available"
                    }).then(()=>chooseLounge({}))}}>Kich hoạt</Button>}
                </div>
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