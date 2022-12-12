import React, {useEffect, useState} from 'react';
import {BsPlus} from "react-icons/bs";
import {Button, Dropdown, Input, Transition, Modal} from "semantic-ui-react";
import {addNewCustomer, deleteCustomer, getAllCustomer, updateCustomer} from "../../api/customer";
import ICustomer, {initCustomer} from "../../interface/ICustomer";
import StateConvert from "../../utils/StateConvert";
import CustomModal from "../../components/CustomModal";

//TODO: add new customer

const CustomerInfo = () => {

    const [openModal, setOpenModal] = useState(false);
    const [customers, setCustomers] = useState([])
    const [reFetch, requestRefetch] = useState(false)
    useEffect(() => {
        getAllCustomer().then(customers => setCustomers(customers))
    }, [reFetch])
    const [editCustomer, setEditCustomer] = useState(initCustomer)

    const [confirmModal, setOpenConfirm] = useState({state: false, customerId: ""})

    const [isEdit, setEdit] = useState(false)
    return (
        <div className="w-full flex flex-col flex-wrap gap-6 bg-white p-6 rounded-md relative">
            <Transition visible={confirmModal.state} animation='scale' duration={200}>
                <Modal dimmer="blurring" size={"tiny"} open={confirmModal.state}
                       onClose={() => setOpenConfirm({state: false, customerId: ""})}>
                    <Modal.Header>Xóa khách hàng ?</Modal.Header>
                    <Modal.Content>Khách hàng sẽ được xóa !?</Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={() => setOpenConfirm({state: false, customerId: ""})}>Không</Button>
                        <Button negative onClick={() => {
                            deleteCustomer(confirmModal.customerId).then(r => {
                                    setOpenConfirm({state: false, customerId: ""})
                                    requestRefetch(prev => !prev)
                                }
                            )
                        }}>Xóa</Button>
                    </Modal.Actions>
                </Modal>
            </Transition>
            {openModal && <CustomModal showHandler={setOpenModal}>
                <h2 className="font-semibold mb-4">{isEdit ? "Sửa thông tin khách hàng":"Thêm khách hàng mới"}</h2>
                <div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Tên khách hàng</label>
                        <Input onChange={(e)=>{setEditCustomer((prev)=> ({...prev, name: e.target.value}))}} value={editCustomer.name} type="text"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Số chứng minh thư</label>
                        <Input onChange={(e)=>{setEditCustomer((prev)=> ({...prev, identify_number: e.target.value }))}} value={editCustomer.identify_number} type="text"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Giới tính</label>
                        <Dropdown onChange={(e, data)=>{ // @ts-ignore
                            setEditCustomer((prev)=> ({...prev, gender: data?.value || "" }))}} selection fluid value={editCustomer.gender}  options={[{
                                text: 'Nam', value: 'Nam',
                            },
                            {
                                text: 'Nữ', value: 'Nữ',
                            },
                            {
                                text: 'Khác', value: 'Khác',
                            }]}/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Ngày tháng năm sinh</label>
                        <Input onChange={(e)=>{setEditCustomer((prev)=> ({...prev,birthday: e.target.value }))}} value={editCustomer.birthday.split('T')[0]}  type="date"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Email</label>
                        <Input onChange={(e)=>{setEditCustomer((prev)=> ({...prev,email: e.target.value }))}} value={editCustomer.email} type="text"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Địa chỉ</label>
                        <Input onChange={(e)=>{setEditCustomer((prev)=> ({...prev,address: e.target.value }))}} value={editCustomer.address} type="text"/>
                    </div>
                    <div className="flex w-full gap-4 justify-end">
                        <Button onClick={()=> {
                            setOpenModal(false)
                            setEditCustomer(initCustomer)
                        }}>Hủy</Button>
                        <Button primary onClick={(e)=>{
                            e.preventDefault()
                            if (!isEdit) {
                                addNewCustomer(editCustomer).then((res) => {
                                    setOpenModal(!res.data.success)
                                    requestRefetch(prev => !prev)
                                })
                            }
                            else {
                                console.log(editCustomer)
                                updateCustomer(editCustomer?._id, editCustomer).then((res) => {
                                    setOpenModal(!res.data.success)
                                    requestRefetch(prev => !prev)
                                })
                            }
                        }}>{isEdit ? "Cập nhật":"Thêm mới"}</Button>
                    </div>
                </div>
            </CustomModal>}

            <h1 className="text-2xl font-bold mt-0">Khách hàng</h1>
            <div onClick={()=> {
                setEditCustomer(initCustomer)
                setOpenModal(true)
            }} className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"><BsPlus/> Thêm khách hàng</div>
            <table className="w-full table-auto h-fit border-collapse relative">
                <thead>
                    <tr>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left break-all">Mã KH</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Tên KH</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Chứng minh thư</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap max-w-[100px] break-all text-left">Địa chỉ</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Email</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Ngày sinh</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Số tiệc đã đặt</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Trạng thái</th>
                        <th className="p-2 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                {
                    customers.map((customer: any)=>{
                        return (
                        <tr className="hover:bg-cyan-200 even:bg-cyan-100 transition-colors cursor-pointer">
                            <td className="max-w-[100px] break-all py-4 px-2 font-semibold">{customer.userinfo._id}</td>
                            <td className="py-4 px-2">{customer.userinfo.name}</td>
                            <td className="py-4 px-2 max-w-[20px] break-all">{customer.userinfo.identify_number}</td>
                            <td className="py-4 px-2 max-w-[100px] break-all">{customer.userinfo.address}</td>
                            <td className="py-4 px-2">{customer.userinfo.email}</td>
                            <td className="py-4 px-2">{(new Date(customer.userinfo.birthday)).toDateString()}</td>
                            <td className="py-4 px-2">{customer.userinfo.party_ordered}</td>
                            <td className="py-4 px-2">{<StateConvert state={customer.userinfo.state}/>}</td>
                            <td className="py-4 px-2 flex gap-4">
                                <Button onClick={()=>{
                                    setEditCustomer(customer.userinfo)
                                    setEdit(true)
                                    setOpenModal(true)
                                }
                                }>Sửa</Button>
                                <Button color={"red"} onClick={
                                    ()=>{
                                        setOpenConfirm({state: true, customerId: customer._id})
                                    }
                                }>Xóa</Button>
                            </td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default CustomerInfo;