import React, {useEffect, useLayoutEffect, useState} from 'react';
import CustomModal from "../../components/CustomModal";
import {BsPlus} from "react-icons/bs";
import store from "../../store";
import {setPage} from "../../store/reducers/page";
import {Accordion, Button, Dropdown, Icon, Input, Label, Modal, Transition} from "semantic-ui-react";
import {getAllCustomer} from "../../api/customer";
import {useSelector} from "react-redux";
import {bookingRecordSelector} from "../../store/reducers/bookingRecord";
import {loungesSelector} from "../../store/reducers/lounge";
import ILounge from "../../interface/ILounge";
import {getAllLounge} from "../../api/lounge";
import IBookingRecord, {initRecord} from "../../interface/IBookingRecord";
import {
    addBookingRecord, cancelBookingContract, cancelBookingRecord, confirmBookingContract,
    confirmBookingRecord,
    deleteRecord,
    getAllBookingRecord,
    updateRecord
} from "../../api/bookingRecord";
import ICustomer from '../../interface/ICustomer';
import StateConvert from "../../utils/StateConvert";
import {menuSelector} from "../../store/reducers/menu";
import IMenu, {initMenu} from "../../interface/IMenu";
import {getAllMenu} from "../../api/menu";
import {serviceSelector} from "../../store/reducers/service";
import {getAllService} from "../../api/service";
import IService from "../../interface/IService";

const SaleDeal = () => {
    const [openModal, setOpenModal] = useState(false);
    const menus = useSelector(menuSelector)
    const services = useSelector(serviceSelector)

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
        getAllMenu()
        getAllService()
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

    const total = () => {

        return lounge(currentRecord.record.loungeId).price
            + services.filter((ser:any) => currentRecord.record.services?.includes(ser._id)).reduce((val:Number, item:any) => val + item.price, 0)
            // @ts-ignore
            + menus.find((menu:any)=> menu._id === currentRecord.record.menuId)?.price * (currentRecord.record?.guest_amount / 10)
    }

    const [editMode, setEditMode] = useState(false);
    const [editRecord, setEditRecord] = useState(initRecord)

    const [currentRecord, setCurrentRecord] = useState({state: false, record: initRecord})
    const [confirmModal, setOpenConfirm] = useState({state: false, recordId: ""});

    const [confirmRecord, setConfirmRecord] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [openService, setOpenService] = useState(false)

    const [currentMenu, chooseMenu] = useState(initMenu);
    const [activeIndex, setActiveIndex] = useState(-1);

    const [confirmCancel, setConfirmCancel] = useState(false)
    const [confirmContract, setConfirmContract] = useState(false)
    const [cancelContract, setCancelContract] = useState(false)
    const [deposite, setDepositeContract] = useState(false)

    const [depositeRecord, setDepositeRecord] = useState({

    })
    return (
        <>
            {confirmModal.state &&
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

            {confirmRecord &&
            <Transition visible={confirmRecord} animation='scale' duration={200}>
                <Modal dimmer="blurring" size={"tiny"} open={confirmRecord}
                       onClose={() => setConfirmRecord(false)}>
                    <Modal.Header>Xác nhận tạo hợp đồng ?</Modal.Header>
                    <Modal.Content>Hợp đồng sẽ được tạo!</Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setConfirmRecord(false)}>Không</Button>
                        <Button positive onClick={() => {
                            confirmBookingRecord(currentRecord.record).then(r => {
                                    setCurrentRecord({state: false, record: initRecord});
                                    setConfirmRecord(false)
                                    requestRefetch(prev => !prev)
                                }
                            )
                        }}>Xác nhận</Button>
                    </Modal.Actions>
                </Modal>
            </Transition>}

            {confirmCancel &&
            <Transition visible={confirmCancel} animation='scale' duration={200}>
                <Modal dimmer="blurring" size={"tiny"} open={confirmCancel}
                       onClose={() => setConfirmCancel(false)}>
                    <Modal.Header>Xác nhận sẽ hủy hợp đồng này ?</Modal.Header>
                    <Modal.Content>Thao tác này không thể làm lại!</Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setConfirmCancel(false)}>Không</Button>
                        <Button positive onClick={() => {
                            cancelBookingRecord(currentRecord.record).then(r => {
                                    setCurrentRecord({state: false, record: initRecord});
                                    setConfirmCancel(false)
                                    requestRefetch(prev => !prev)
                                }
                            )
                        }}>Xác nhận</Button>
                    </Modal.Actions>
                </Modal>
            </Transition>}

            {confirmContract &&
            <Transition visible={confirmContract} animation='scale' duration={200}>
                <Modal dimmer="blurring" size={"tiny"} open={confirmContract}
                       onClose={() => setConfirmContract(false)}>
                    <Modal.Header>Xác nhận đã ký hợp đồng này ?</Modal.Header>
                    <Modal.Content>Thao tác này không thể làm lại!</Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setConfirmContract(false)}>Không</Button>
                        <Button positive onClick={() => {
                            confirmBookingContract(currentRecord.record).then(r => {
                                    setCurrentRecord({state: false, record: initRecord});
                                    setConfirmContract(false)
                                    requestRefetch(prev => !prev)
                                }
                            )
                        }}>Xác nhận</Button>
                    </Modal.Actions>
                </Modal>
            </Transition>}

            {cancelContract &&
            <Transition visible={cancelContract} animation='scale' duration={200}>
                <Modal dimmer="blurring" size={"tiny"} open={cancelContract}
                       onClose={() => setCancelContract(false)}>
                    <Modal.Header>Xác nhận đã ký hợp đồng này ?</Modal.Header>
                    <Modal.Content>Thao tác này không thể làm lại!</Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setCancelContract(false)}>Không</Button>
                        <Button positive onClick={() => {
                            cancelBookingContract(currentRecord.record).then(r => {
                                    setCurrentRecord({state: false, record: initRecord});
                                setCancelContract(false)
                                    requestRefetch(prev => !prev)
                                }
                            )
                        }}>Xác nhận</Button>
                    </Modal.Actions>
                </Modal>
            </Transition>}

            {cancelContract &&
            <Transition visible={cancelContract} animation='scale' duration={200}>
                <Modal dimmer="blurring" size={"tiny"} open={cancelContract}
                       onClose={() => setCancelContract(false)}>
                    <Modal.Header>Xác nhận đã ký hợp đồng này ?</Modal.Header>
                    <Modal.Content>Thao tác này không thể làm lại!</Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setCancelContract(false)}>Không</Button>
                        <Button positive onClick={() => {
                            cancelBookingContract(currentRecord.record).then(r => {
                                    setCurrentRecord({state: false, record: initRecord});
                                setCancelContract(false)
                                    requestRefetch(prev => !prev)
                                }
                            )
                        }}>Xác nhận</Button>
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
            {openMenu && <CustomModal showHandler={setOpenMenu}>
                <h2 className="font-semibold mb-4">Thiết lập menu</h2>
                <div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Chọn menu</label>
                        <Dropdown value={editRecord?.menuId} onChange={(e, data)=>{
                            // @ts-ignore
                            setEditRecord((prev)=>({...prev, menuId: data.value}))
                            // @ts-ignore
                            chooseMenu(menus.find(menu => menu._id === data?.value))
                        }} placeholder="Chọn menu" options={
                            menus.filter((menu:IMenu) => menu.state === 'available').map((menu:IMenu) => {
                                return {
                                    text: menu.name,
                                    value: menu._id
                                }
                            })
                        } selection fluid/>
                    </div>
                    <div className="mb-8">
                        <Accordion fluid styled>
                            {
                                // @ts-ignore
                                currentMenu.soup?.length > 0 && <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={() => setActiveIndex((prev) => prev === 0 ? -1 : 0)}
                            >
                                <Icon name='dropdown'/>
                                Món Soup
                            </Accordion.Title>}
                            {
                                // @ts-ignore
                                currentMenu.soup?.length > 0 && <Accordion.Content active={activeIndex === 0}>
                                <Label.Group color="blue">
                                    {currentMenu.soup?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                            {
                                // @ts-ignore
                                currentMenu.salad?.length > 0 && <Accordion.Title
                                active={activeIndex === 1}
                                index={1}
                                onClick={() => setActiveIndex((prev) => prev === 1 ? -1 : 1)}
                            >
                                <Icon name='dropdown'/>
                                Món Salad
                            </Accordion.Title>}
                            {
                                // @ts-ignore
                                currentMenu.salad?.length > 0 && <Accordion.Content active={activeIndex === 1}>
                                <Label.Group color="blue">
                                    {currentMenu.salad?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                            {
                                // @ts-ignore
                                currentMenu.main?.length > 0 && <Accordion.Title
                                active={activeIndex === 2}
                                index={2}
                                onClick={() => setActiveIndex((prev) => prev === 2 ? -1 : 2)}
                            >
                                <Icon name='dropdown'/>
                                Món chính
                            </Accordion.Title>}
                            {
                                // @ts-ignore
                                currentMenu.main?.length > 0 && <Accordion.Content active={activeIndex === 2}>
                                <Label.Group color="blue">
                                    {currentMenu.main?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                            {
                                // @ts-ignore
                                currentMenu.dessert?.length > 0 && <Accordion.Title
                                active={activeIndex === 3}
                                index={3}
                                onClick={() => setActiveIndex((prev) => prev === 3 ? -1 : 3)}
                            >
                                <Icon name='dropdown'/>
                                Món tráng miệng
                            </Accordion.Title>}
                            {
                                // @ts-ignore
                                currentMenu.dessert?.length > 0 && <Accordion.Content active={activeIndex === 3}>
                                <Label.Group color="blue">
                                    {currentMenu.dessert?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                            {
                                // @ts-ignore
                                currentMenu.other?.length > 0 && <Accordion.Title
                                active={activeIndex === 4}
                                index={4}
                                onClick={() => setActiveIndex((prev) => prev === 4 ? -1 : 4)}
                            >
                                <Icon name='dropdown'/>
                                Món khác
                            </Accordion.Title>}
                            {
                                // @ts-ignore
                                currentMenu.other?.length > 0 && <Accordion.Content active={activeIndex === 4}>
                                <Label.Group color="blue">
                                    {currentMenu.other?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                        </Accordion>
                    </div>
                    <div className="flex w-full gap-4 justify-end">
                        <Button onClick={()=> {
                            setOpenMenu(false)
                        }} >Hủy</Button>
                        <Button onClick={(e)=> {
                            e.preventDefault();
                            updateRecord(editRecord._id, editRecord).then(() =>{
                                    setOpenMenu(false)
                                    setCurrentRecord({state: true, record: editRecord});
                                    setEditRecord(initRecord)
                                    requestRefetch(prev => !prev);
                                }
                            )

                        }} primary>Thay đổi</Button>
                    </div>
                </div>
            </CustomModal>}
            {openService && <CustomModal showHandler={setOpenService}>
                <h2 className="font-semibold mb-4">Thiết lập dịch vụ</h2>
                <div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Chọn dịch vụ</label>
                        {//@ts-ignore
                            <Dropdown value={editRecord?.services || []} onChange={(e, data)=>{
                            // @ts-ignore
                            setEditRecord((prev)=>({...prev, services: data.value}))
                        }} placeholder="Chọn dịch vụ" options={
                            services.filter((service:IService) => service.state === 'available').map((service:IService) => {
                                return {
                                    text: service.name,
                                    value: service._id
                                }
                            })
                        } selection multiple fluid/>}
                    </div>
                    <div className="flex w-full gap-4 justify-end">
                        <Button onClick={()=> {
                            setOpenService(false)
                        }} >Hủy</Button>
                        <Button onClick={(e)=> {
                            e.preventDefault();
                            updateRecord(editRecord._id, editRecord).then(() =>{
                                    setOpenService(false)
                                    setCurrentRecord({state: true, record: editRecord});
                                    setEditRecord(initRecord)
                                    requestRefetch(prev => !prev);
                                }
                            )
                        }} primary>Thay đổi</Button>
                    </div>
                </div>
            </CustomModal>}

            {deposite && <CustomModal showHandler={setDepositeContract}>
                <h2 className="font-semibold mb-4">Đặt cọc</h2>
                <div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Thanh toán bằng ?</label>
                        <Dropdown fluid/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Số tiền cọc</label>
                        <Input fluid/>
                    </div>
                    <div className="flex w-full gap-4 justify-end">
                        <Button onClick={()=> {
                            setDepositeContract(false)
                        }} >Hủy</Button>
                        <Button onClick={(e)=> {
                            e.preventDefault();
                            updateRecord(editRecord._id, editRecord).then(() =>{
                                    setDepositeContract(false)
                                    setCurrentRecord({state: true, record: editRecord});
                                    setEditRecord(initRecord)
                                    requestRefetch(prev => !prev);
                                }
                            )
                        }} primary>Xác nhận</Button>
                    </div>
                </div>
            </CustomModal>}
            <h1 className="text-2xl font-bold">Đơn đặt tiệc</h1>
            <p className="mb-6">Hiện có : {records?.length} đơn đặt tiệc</p>
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
                                lounges.find((lounge:ILounge) => lounge._id === currentRecord.record.loungeId)?.name
                            } Ca {
                                currentRecord.record.shift === 'Chiều' ? 'chiều (14:00 - 22:00)':'sáng (9:00 - 14:00)'
                            }</p>

                            <p><b>Menu : </b>{menus.find(((menu:IMenu) => menu._id === currentRecord.record.menuId))?.name}</p>

                            <p><b>Tổng tiền đặt tiệc : </b>{
                                total().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            } VND</p>

                            {//@ts-ignore
                                currentRecord.record.services?.length > 0 &&
                                <>
                                    <p><b>Danh sách dịch vụ : </b> <br/></p>
                                    <div className="flex gap-4 flex-wrap mb-4">
                                        {//@ts-ignore
                                            currentRecord.record.services.map((service:any) => {
                                                const servicesFil = services.find((ser:IService) => ser._id === service)
                                                return <Label color="pink">{servicesFil.name}</Label>
                                        })}
                                    </div>
                                </>
                            }
                            {//@ts-ignore
                                (currentRecord.record.state !== 'cancel' && currentRecord.record.state !== 'finished' && currentRecord.record.state !== "paid" && currentRecord.record.state !== 'processing') &&
                                <>
                                <p><b>Cập nhật tiệc:</b></p>
                                <div className="flex flex-row gap-2 mt-4 flex-wrap">
                                    {//@ts-ignore
                                        (currentRecord.record.state !== "contract confirmed" && currentRecord.record.state !== "deposited" ) && <><Button primary onClick={() => {
                                        setEditRecord(currentRecord.record);
                                        setOpenMenu(true)
                                    }}>Cập nhật menu</Button>
                                        <Button primary onClick={() => {
                                        setEditRecord(currentRecord.record);
                                        setOpenService(true)
                                    }}>Cập nhật danh sách dịch vụ</Button>

                                    {(currentRecord.record.state === 'init') &&
                                        <Button color="green" onClick={() => {
                                        setConfirmRecord(true)
                                    }}>Xác nhận đặt</Button>}

                                    {currentRecord.record.state === 'confirmed' &&
                                        <Button onClick={() => {
                                        setConfirmContract(true)
                                    }} color="violet">Xác nhận hợp đồng</Button>
                                    }</>}

                                    {(currentRecord.record.state === "contract confirmed") && <><Button color="green" onClick={() => {
                                        setDepositeContract(true)
                                    }}>Đặt cọc</Button></>}

                                    {(currentRecord.record.state === "deposited") && <><Button color="green" onClick={() => {
                                        setDepositeContract(true)
                                    }}>Thanh toán toàn bộ</Button></>}

                                    {currentRecord.record.state === "contract confirmed" && <><Button negative onClick={() => {
                                        setCancelContract(true)
                                    }}>Hủy hợp đồng</Button></>}
                                </div>
                            <p className={"mt-4"} ><b>Thao tác:</b></p>
                            <div className="flex flex-row gap-2 mt-4 flex-wrap">
                                {(currentRecord.record.state === 'confirmed' || currentRecord.record.state === 'init') && <Button primary onClick={() => {
                                    setEditMode(true);
                                    setEditRecord(currentRecord.record);
                                    setOpenModal(true)
                                }}>Sửa thông tin</Button>}
                                {currentRecord.record.state === 'init' && <Button onClick={() => setOpenConfirm({
                                    state: true,
                                    recordId: currentRecord.record._id || ""
                                })}
                                    color="red">Xóa</Button>}

                                {(currentRecord.record.state !== 'init') &&
                                <Button onClick={() => {
                                }}
                                        color="blue">In hợp đồng</Button>
                                }

                                {currentRecord.record.state === 'confirmed' &&
                                    <Button onClick={() => {
                                        setConfirmCancel(true)
                                        requestRefetch(prev => !prev)
                                    }}
                                    color="red">Hủy tiệc</Button>
                                }
                                </div>

                            </>}
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    );
};

export default SaleDeal;