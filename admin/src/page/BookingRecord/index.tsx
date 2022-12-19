import React, {useEffect, useLayoutEffect, useState} from 'react';
import CustomModal from "../../components/CustomModal";
import {BsPlus} from "react-icons/bs";
import store from "../../store";
import {setPage} from "../../store/reducers/page";
import {Button, Dropdown, Input, Modal, Transition} from "semantic-ui-react";
import {getAllCustomer} from "../../api/customer";
import {useSelector} from "react-redux";
import {bookingRecordSelector} from "../../store/reducers/bookingRecord";
import {loungesSelector} from "../../store/reducers/lounge";
import ILounge from "../../interface/ILounge";
import {getAllLounge} from "../../api/lounge";
import IBookingRecord, {initRecord} from "../../interface/IBookingRecord";
import {addBookingRecord, deleteRecord, getAllBookingRecord, updateRecord} from "../../api/bookingRecord";
import ICustomer from '../../interface/ICustomer';
import StateConvert from "../../utils/StateConvert";

const SaleDeal = () => {
    const [openModal, setOpenModal] = useState(false);

    useLayoutEffect(()=>{
        store.dispatch(setPage("sale_deals"))
    })

    const records = useSelector(bookingRecordSelector);
    const lounges = useSelector(loungesSelector)

    const [customers, setCustomers] = useState([])
    const [reFetch, requestRefetch] = useState(false)

    useEffect(() => {
        getAllLounge()
        getAllBookingRecord()
        getAllCustomer().then(customers => {
            setCustomers(customers)
        })
    }, [reFetch])

    const customerOpt = ()=>{
        return customers.map(customer => {
            // @ts-ignore
            const {name, _id} = customer;
            return ({text: name, value: _id});
        })
    }

    const loungesOpt = ()=>{
        return lounges.map((lounge:ILounge) => ({
            text: lounge.name,
            value: lounge._id
        }))
    }

    const lounge = (id:String) =>{
        return lounges.find((lounge:ILounge)=>lounge._id === id)
    }

    const [editMode, setEditMode] = useState(false);
    const [editRecord, setEditRecord] = useState(initRecord)

    const [currentRecord, setCurrentRecord] = useState({state: false, record: initRecord})
    const [confirmModal, setOpenConfirm] = useState({state: false, recordId: ""});

    return (
        <>  {confirmModal.state &&
            <Transition visible={confirmModal.state} animation='scale' duration={200}>
                <Modal dimmer="blurring" size={"tiny"} open={confirmModal.state}
                       onClose={() => setOpenConfirm({state: false, recordId: ""})}>
                    <Modal.Header>Xóa dịch vụ ?</Modal.Header>
                    <Modal.Content>Dịch vụ sẽ được xóa !?</Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => setOpenConfirm({state: false, recordId: ""})}>Không</Button>
                        <Button positive onClick={() => {
                            deleteRecord(confirmModal.recordId).then(r => {
                                    setCurrentRecord({state: false, record: initRecord});
                                    setOpenConfirm({state: false, recordId: ""})
                                    requestRefetch(prev => !prev)
                                }
                            )
                        }}>Xóa</Button>
                    </Modal.Actions>
                </Modal>
            </Transition>}
            <div className="bg-white p-6 rounded-md relative">
            {openModal && <CustomModal showHandler={setOpenModal}>
                <h2 className="font-semibold mb-4">{editMode ? "Cập nhật thông tin" : "Thêm đơn mới"}</h2>
                <div>
                    {!editMode && <div className="flex flex-col gap-2 mb-4">
                        <label>Chọn khách hàng</label>
                        <Dropdown value={editRecord.customerId} onChange={(e, data) => {
                            // @ts-ignore
                            setEditRecord((prev) => ({...prev, customerId: data.value}))
                        }} placeholder="Chọn khách hàng" options={customerOpt()} selection fluid/>
                    </div>}
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Tên cô dâu</label>
                        <Input value={editRecord.host.bride.name} onChange={(event => setEditRecord((prev)=>({...prev, host: {...prev.host, bride: {...prev.host.bride, name: event.target.value}}})))} type="text"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Năm sinh</label>
                        <Input value={editRecord.host.bride.birthday} onChange={(event, data) => setEditRecord((prev)=>({...prev, host: {...prev.host, bride: {...prev.host.bride, birthday: data.value}}}))} type="date"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Tên chú rể</label>
                        <Input value={editRecord.host.groom.name} onChange={(event => setEditRecord((prev)=>({...prev, host: {...prev.host, groom: {...prev.host.groom, name: event.target.value}}})))} type="text"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Năm sinh</label>
                        <Input value={editRecord.host.groom.birthday} onChange={(event, data) => setEditRecord((prev)=> ({...prev, host:{...prev.host, groom:{...prev.host.groom, birthday:data.value}
                            }
                        }))} type="date"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Ngày cưới</label>
                        <Input value={editRecord.wed_date} onChange={(e, data)=>setEditRecord((prev)=> {
                            {
                                console.log(data.value);
                                return {...prev, wed_date: data.value}
                            }
                        })} type="date"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Chọn ca tổ chức</label>
                        <Dropdown value={editRecord.shift} onChange={(e, data)=>{
                            // @ts-ignore
                            setEditRecord((prev)=>({...prev, shift: data.value}))
                        }} placeholder="Chọn sảnh" options={[{text: "Sáng 9:00 - 14:00", value: 'Sáng'}, {text: "Chiều 17:00 - 22:00", value: 'Chiều'}]} selection fluid/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Chọn sảnh dự kiến</label>
                        <Dropdown value={editRecord.loungeId} onChange={(e, data)=>{
                            // @ts-ignore
                            setEditRecord((prev)=>({...prev, loungeId: data.value}))
                        }} placeholder="Chọn sảnh" options={loungesOpt()} selection fluid/>
                    </div>
                    {editRecord.loungeId &&
                        <div className="mb-4">
                            <p>Sức chứa của sảnh : {lounge(editRecord.loungeId).capacity} khách</p>
                        </div>}
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Số lượng khách mời dự kiến</label>
                        <Input value={editRecord.guest_amount} onChange={(e)=> {
                            // @ts-ignore
                            setEditRecord((prev) => ({...prev, guest_amount: parseInt(e.target.value)}))
                        }} type="number"/>
                    </div>
                    <div className="flex w-full gap-4 justify-end">
                        <Button onClick={()=> {
                            setEditRecord(initRecord)
                            setOpenModal(false)
                        }} >Hủy</Button>
                        <Button onClick={(e)=> {
                            e.preventDefault();
                            if (editMode){
                                updateRecord(editRecord._id, editRecord).then(() =>{
                                        setOpenModal(false)
                                        setCurrentRecord({state: true, record: editRecord});
                                        setEditRecord(initRecord)
                                        requestRefetch(prev => !prev);
                                    }
                                )
                            } else {
                                addBookingRecord(editRecord).then(() =>{
                                        setOpenModal(false)
                                        setCurrentRecord({state: true, record: editRecord});
                                        setEditRecord(initRecord)
                                        requestRefetch(prev => !prev);
                                    }
                                )
                            }

                        }} primary>{editMode ? "Cập nhật": "Thêm mới"}</Button>
                    </div>
                </div>
            </CustomModal>}

            <h1 className="text-2xl font-bold">Đơn đặt tiệc</h1>
            <p className="mb-6">Hiện có : 0 đơn đặt tiệc</p>
            <div onClick={()=> {
                setEditRecord(initRecord)
                setEditMode(false)
                setOpenModal(true)
            }} className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"><BsPlus/> Thêm đơn mới</div>

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
                        {
                            records.map((record:IBookingRecord) => (
                                <tr key={record._id} onClick={()=> setCurrentRecord({state: true, record: record})} className="hover:bg-cyan-200 even:bg-cyan-100 transition-colors cursor-pointer">
                                    <td className="py-4 px-2 font-semibold">{record._id}</td>
                                    <td className="py-4 px-2">{
                                        // @ts-ignore
                                        customers.find((cus:ICustomer) => cus._id === record.customerId)?.name
                                    }</td>
                                    <td className="py-4 px-2">{record?.create_at}</td>
                                    <td className="py-4 px-2">Sảnh {
                                        lounge(record.loungeId)?.name
                                    }</td>
                                    <td className="py-4 px-2">{record.shift === 'Chiều' ? 'Chiều (14:00 - 22:00)':'Sáng (9:00 - 14:00)'}</td>
                                    <td className="py-4 px-2">{record.wed_date}</td>
                                    <td className="py-4 px-2"><StateConvert state={record.state}/></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <div className="basis-1/3 h-full">
                    {
                        currentRecord.state &&
                        <div className="basis-1/3 h-full overflow-y-scroll pl-2 pr-6 overflow-y-scroll pl-2 pr-6">
                            <h3 className="text-xl font-semibold">Chi tiết</h3>
                            <p className="text-lg font-semibold">#{currentRecord.record._id}</p>
                            <p><b>Trạng thái</b> : <StateConvert state={currentRecord.record.state}/></p>
                            <p><b>Khách đặt</b> : {
                                // @ts-ignore
                                customers.find((cus:ICustomer) => cus._id === currentRecord.record.customerId)?.name
                            }</p>
                            <p><b>Thông tin tiệc : </b></p>
                            <p><b>Cô dâu : </b> {currentRecord.record.host.bride.name} ({new Date(currentRecord.record.host.bride.birthday).getFullYear()})</p>
                            <p><b>Chú rể : </b> {currentRecord.record.host.groom.name} ({new Date(currentRecord.record.host.groom.birthday).getFullYear()})</p>
                            <br/>
                            <p><b>Sảnh : </b> {
                                // @ts-ignore
                                lounges.find((lounge:ILounge) => lounge._id === currentRecord.record.loungeId)?.name
                            } Ca {
                                currentRecord.record.shift
                            }</p>

                            <p><b>Thao tác:</b></p>
                            <div className="flex flex-row gap-2">
                                <Button primary onClick={() => {
                                    setEditMode(true);
                                    setEditRecord(currentRecord.record);
                                    setOpenModal(true)
                                }}>Sửa</Button>
                                <Button onClick={() => setOpenConfirm({state: true, recordId: currentRecord.record._id || ""})}
                                        color="red">Xóa</Button>
                            </div>
                        </div>

                    }
                </div>
            </div>
        </div>
        </>
    );
};

export default SaleDeal;