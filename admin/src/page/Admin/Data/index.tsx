import React, {useEffect, useState} from 'react';
import {Accordion, Button, Dropdown, Icon, Input, Label, Modal, Tab, Transition} from 'semantic-ui-react'
import {BsPlus} from "react-icons/bs";
import CustomModal from "../../../components/CustomModal";
import ILounge, {initLounge} from "../../../interface/ILounge";
import {addLounge, deleteLounge, getAllLounge, updateLounge} from "../../../api/lounge";
import {useSelector} from "react-redux";
import {loungesSelector} from "../../../store/reducers/lounge";
import {toast} from "react-toastify";
import StateConvert from "../../../utils/StateConvert";
import {serviceSelector} from "../../../store/reducers/service";
import IService, {initService, typeAdapter} from "../../../interface/IService";
import {serviceType} from "../../../utils/serviceType";
import {addService, deleteService, getAllService, updateService} from "../../../api/service";
import {dishSelector, groupsSelector} from "../../../store/reducers/dish";
import IDish, {dishOrderAdapter, dishTypeAdapter, initDish} from "../../../interface/IDish";
import {addDish, deleteDish, getAllDishes, updateDish} from "../../../api/dish";
import {menuSelector} from "../../../store/reducers/menu";
import IMenu, {initMenu, menuGetAdapterGroup} from "../../../interface/IMenu";
import {addMenu, deleteMenu, getAllMenu, updateMenu} from "../../../api/menu";
import menuTotal from "../../../utils/menuTotal";


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
            if (editMode) {
                updateLounge({...newLounge}).then((res) => {
                    if (res.success) {
                        setOpenModal(false);
                        chooseLounge(res.lounge)
                    }
                })
            } else {
                addLounge({...newLounge}).then((res) => {
                    if (res.success) {
                        setOpenModal(false);
                        chooseLounge(res.lounge)
                    }
                })
            }
            chooseLounge(initLounge);
        } else toast.error(formErr.errMsg);
    }

    const [currentLounge, chooseLounge] = useState((lounges.length > 0) ? lounges[0] : initLounge);
    const [editMode, setEditMode] = useState(false)

    // @ts-ignore
    // @ts-ignore
    return <Tab.Pane>
        <Transition visible={confirmModal.state} animation='scale' duration={200}>
            <Modal dimmer="blurring" size={"tiny"} open={confirmModal.state}
                   onClose={() => setOpenConfirm({state: false, loungeId: ""})}>
                <Modal.Header>Xóa sảnh cưới ?</Modal.Header>
                <Modal.Content>Sảnh sẽ được xóa !?</Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpenConfirm({state: false, loungeId: ""})}>Không</Button>
                    <Button positive onClick={() => {
                        deleteLounge(confirmModal.loungeId).then(() => {
                                chooseLounge(initLounge);
                                setOpenConfirm({state: false, loungeId: ""})
                            }
                        )
                    }}>Xóa</Button>
                </Modal.Actions>
            </Modal>
        </Transition>
        {openModal && <CustomModal showHandler={setOpenModal}>
            <h2 className="font-semibold mb-4">{editMode ? "Sửa thông tin" : "Thêm sảnh mới"}</h2>
            <div>
                <div className="flex flex-col gap-2 mb-4 required field">
                    <label>Tên sảnh*</label>
                    <Input value={newLounge.name} required error={formErr.nameErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            nameErr: false
                        } : {...prevState, error: true, nameErr: true}))
                        setNewLounge((prev: any) => {
                            return {
                                ...prev, name: e.target.value
                            }
                        })
                    }} type="text"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Vị trí sảnh</label>
                    <Input value={newLounge.position || ""} onChange={(e) => {
                        setNewLounge((prev: ILounge) => ({...prev, position: e.target.value}))
                    }} type="text"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Sức chứa*</label>
                    <Input value={newLounge.capacity} required error={formErr.capacityErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            capacityErr: false
                        } : {...prevState, error: true, capacityErr: true}))
                        setNewLounge((prev: any) => {
                            return {
                                ...prev, capacity: parseInt(e.target.value)
                            }
                        })
                    }} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Số bàn*</label>
                    <Input value={newLounge.max_table} required error={formErr.tableErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            tableErr: false
                        } : {...prevState, error: true, tableErr: true}))
                        setNewLounge((prev: any) => {
                            return {...prev, max_table: parseInt(e.target.value)}
                        })
                    }} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Giá đặt sảnh*</label>
                    <Input value={newLounge.price} required error={formErr.priceErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            priceErr: false
                        } : {...prevState, error: true, priceErr: true}))
                        setNewLounge((prev: any) => {
                            return {
                                ...
                                    prev, price: parseFloat(e.target.value)
                            }
                        })
                    }} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Mô tả</label>
                    <Input value={newLounge.description || ""} onChange={(e) => setNewLounge((prev: ILounge) => {
                        return {
                            ...
                                prev, description: e.target.value
                        }
                    })} type="text"/>
                </div>
                <div className="flex w-full gap-4 justify-end">
                    <Button onClick={() => {
                        setOpenModal(false)
                    }}>Hủy</Button>
                    <Button onClick={(e) => {
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
            setErr({
                error: true,
                nameErr: true,
                capacityErr: true,
                tableErr: true,
                priceErr: true,
                errMsg: "Điền đầy đủ các trường thông tin !",
            })
        }}
             className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer">
            <BsPlus/> Thêm sảnh mới
        </div>

        <div className="flex flex-row gap-10 w-full h-[70vh]">
            <div className="h-full basis-2/3 overflow-y-scroll">
                <table className="w-full table-auto h-fit border-collapse relative">
                    <thead>
                    <tr>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white max-w-[100px] break-all whitespace-nowrap text-left">Mã
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
                        lounges.map(((lounge: ILounge, i: number) => {
                            return (
                                <tr onClick={() => {
                                    chooseLounge(lounge)
                                }} key={`Lounge${i}`}
                                    className={`hover:bg-cyan-200  transition-colors cursor-pointer ${lounge?._id === currentLounge?._id ? "bg-cyan-200" : ""}`}>
                                    <td className="py-4 px-2 max-w-[100px] break-all font-semibold">{lounge?._id}</td>
                                    <td className="py-4 px-2">{lounge?.name}</td>
                                    <td className="py-4 px-2">{lounge?.position ? lounge?.position : ""}</td>
                                    <td className="py-4 px-2">{lounge?.capacity}</td>
                                    <td className="py-4 px-2">{lounge?.max_table}</td>
                                    <td className="py-4 px-2"><StateConvert state={lounge?.state}/></td>
                                </tr>
                            )
                        }))
                    }
                    </tbody>
                </table>
            </div>
            {!currentLounge?.init &&
                <div className="basis-1/3 h-full overflow-y-scroll pl-2 pr-6 overflow-y-scroll pl-2 pr-6">
                    <h3 className="text-xl font-semibold">Chi tiết</h3>
                    <h4 className="text-lg mt-0 font-semibold">Sảnh {currentLounge?.name}</h4>
                    <p className="text-lg font-semibold">#{currentLounge?._id}</p>
                    <p><b>Trạng thái</b> : <StateConvert state={currentLounge?.state || "unavailable"}/></p>
                    <p><b>Sức chứa của sảnh</b> : {currentLounge?.capacity} khách</p>
                    <p><b>Số lượng bàn tối đa</b> : {currentLounge?.max_table}</p>
                    <p><b>Vị trí trong tòa nhà</b> : {currentLounge?.position || ""}</p>
                    <p><b>Giá đặt sảnh</b> : {currentLounge?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                    </p>
                    <p><b>Mô tả</b> : {currentLounge?.description || ""}</p>
                    <p><b>Thao tác:</b></p>
                    <div className="flex flex-row gap-2">
                        <Button primary onClick={() => {
                            setEditMode(true);
                            setNewLounge(currentLounge);
                            setErr({
                                error: false,
                                nameErr: false,
                                capacityErr: false,
                                tableErr: false,
                                priceErr: false,
                                errMsg: "Điền đầy đủ các trường thông tin !",
                            })
                            setOpenModal(true);
                        }}>Sửa</Button>
                        <Button onClick={() => setOpenConfirm({state: true, loungeId: currentLounge?._id})}
                                color="red">Xóa</Button>
                        {currentLounge?.state === "unavailable" &&
                            <Button color={"green"}
                                    onClick={() => {
                                        updateLounge({
                                            ...currentLounge,
                                            state: "available"
                                        }).then((res) => chooseLounge(res.lounge))
                                    }}>Kich hoạt</Button>}
                        {currentLounge?.state === "available" &&
                            <Button color={"red"}
                                    onClick={() => {
                                        updateLounge({
                                            ...currentLounge,
                                            state: "unavailable"
                                        }).then((res) => chooseLounge(res.lounge))
                                    }}>Dừng hoạt động</Button>}
                    </div>
                </div>}
        </div>
    </Tab.Pane>
}
const TabService = () => {
    const services = useSelector(serviceSelector);
    const [newService, setNewService] = useState(initService);
    const [openModal, setOpenModal] = useState(false)
    const [formErr, setErr] = useState({
        error: true,
        nameErr: true,
        priceErr: true,
        errMsg: "Điền đầy đủ các trường thông tin !",
    })

    const [confirmModal, setOpenConfirm] = useState({state: false, serviceId: ""})

    const formErrValidate = formErr.nameErr || formErr.priceErr

    const formValidate = () => {
        if (!formErr.error) {
            if (editMode) {
                updateService({...newService}).then((res) => {
                    if (res.success) {
                        setOpenModal(false);
                        chooseService(res.service)
                    }
                })
            } else {
                addService({...newService}).then((res) => {
                    if (res.success) {
                        setOpenModal(false);
                        chooseService(res.service)
                    }
                })
            }
            chooseService(initService)
        } else toast.error(formErr.errMsg);
    }

    const [currentService, chooseService] = useState((services.length > 0) ? services[0] : initService);
    const [editMode, setEditMode] = useState(false)

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return <Tab.Pane>
        <Transition visible={confirmModal.state} animation='scale' duration={200}>
            <Modal dimmer="blurring" size={"tiny"} open={confirmModal.state}
                   onClose={() => setOpenConfirm({state: false, serviceId: ""})}>
                <Modal.Header>Xóa dịch vụ ?</Modal.Header>
                <Modal.Content>Dịch vụ sẽ được xóa !?</Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpenConfirm({state: false, serviceId: ""})}>Không</Button>
                    <Button positive onClick={() => {
                        deleteService(confirmModal.serviceId).then(r => {
                                chooseService(initService);
                                setOpenConfirm({state: false, serviceId: ""})
                            }
                        )
                    }}>Xóa</Button>
                </Modal.Actions>
            </Modal>
        </Transition>
        {openModal && <CustomModal showHandler={setOpenModal}>
            <h2 className="font-semibold mb-4">{editMode ? "Sửa thông tin" : "Thêm dịch vụ mới"}</h2>
            <div>
                <div className="flex flex-col gap-2 mb-4 required field">
                    <label>Tên dịch vụ*</label>
                    <Input value={newService.name} required error={formErr.nameErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            nameErr: false
                        } : {...prevState, error: true, nameErr: true}))
                        setNewService((prev: any) => {
                            return {
                                ...
                                    prev, name: e.target.value
                            }
                        })
                    }} type="text"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Giá đặt dịch vụ*</label>
                    <Input value={newService.price} required error={formErr.priceErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            priceErr: false
                        } : {...prevState, error: true, priceErr: true}))
                        setNewService((prev: any) => {
                            return {
                                ...
                                    prev, price: parseFloat(e.target.value)
                            }
                        })
                    }} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Loại dịch vụ</label>
                    <Dropdown
                        value={newService.type}
                        onChange={
                            (e, data) => {
                                setNewService((prev: any) => {
                                    return {...prev, type: data.value};
                                })
                            }}
                        placeholder="Chọn loại hình dịch vụ" options={typeAdapter} selection fluid/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Mô tả</label>
                    <Input value={newService.description || ""} onChange={(e) => setNewService((prev: IService) => {
                        return {
                            ...
                                prev, description: e.target.value
                        }
                    })} type="text"/>
                </div>
                <div className="flex w-full gap-4 justify-end">
                    <Button onClick={(e) => {
                        setOpenModal(false)
                    }}>Hủy</Button>
                    <Button onClick={(e) => {
                        formValidate()
                    }} primary>{editMode ? "Sửa" : "Thêm mới"}</Button>
                </div>
            </div>
        </CustomModal>}
        <h1 className="text-2xl font-bold mt-0">Các dịch vụ</h1>
        <p className="mb-6">Hiện có : {services.length} dịch vụ</p>
        <div onClick={() => {
            setEditMode(false)
            setNewService(initService);
            setErr({
                error: true,
                nameErr: true,
                priceErr: true,
                errMsg: "Điền đầy đủ các trường thông tin !",
            })
            setOpenModal(true)
        }}
             className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer">
            <BsPlus/> Thêm dịch vụ mới
        </div>

        <div className="flex flex-row gap-10 w-full h-[70vh]">
            <div className="h-full basis-2/3 overflow-y-scroll">
                <table className="w-full table-auto h-fit border-collapse relative">
                    <thead>
                    <tr>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white max-w-[100px] break-all whitespace-nowrap text-left">Mã
                            dịch vụ
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Tên
                            dịch vụ
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Loại
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Giá
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Trạng
                            thái
                        </th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {
                        services.map(((service: IService, i: number) => {
                            return (
                                <tr onClick={() => {
                                    chooseService(service)
                                }} key={`Service${i}`}
                                    className={`hover:bg-cyan-200  transition-colors cursor-pointer ${service._id === currentService._id ? "bg-cyan-200" : ""}`}>
                                    <td className="py-4 px-2 max-w-[100px] break-all font-semibold">{service._id}</td>
                                    <td className="py-4 px-2">{service.name}</td>
                                    <td className="py-4 px-2">{serviceType(service.type)}</td>
                                    <td className="py-4 px-2">{service.price}</td>
                                    <td className="py-4 px-2"><StateConvert state={service.state}/></td>
                                </tr>
                            )
                        }))
                    }
                    </tbody>
                </table>
            </div>
            {!currentService?.init &&
                <div className="basis-1/3 h-full overflow-y-scroll pl-2 pr-6 overflow-y-scroll pl-2 pr-6">
                    <h3 className="text-xl font-semibold">Chi tiết</h3>
                    <h4 className="text-lg mt-0 font-semibold">Dịch vụ {currentService.name}</h4>
                    <p className="text-lg font-semibold">#{currentService._id}</p>
                    <p><b>Trạng thái</b> : <StateConvert state={currentService.state || "unavailable"}/></p>
                    <p><b>Loại dịch vụ</b> : {serviceType(currentService.type)}</p>
                    <p><b>Giá đặt dịch
                        vụ</b> : {currentService.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                    </p>
                    <p><b>Mô tả</b> : {currentService.description || ""}</p>
                    <p><b>Thao tác:</b></p>
                    <div className="flex flex-row gap-2">
                        <Button primary onClick={() => {
                            setEditMode(true);
                            setNewService(currentService);
                            setErr({
                                error: false,
                                nameErr: false,
                                priceErr: false,
                                errMsg: "Điền đầy đủ các trường thông tin !",
                            })
                            setOpenModal(true)
                        }}>Sửa</Button>
                        <Button onClick={() => setOpenConfirm({state: true, serviceId: currentService._id})}
                                color="red">Xóa</Button>
                        {currentService.state === "unavailable" && <Button color={"green"} onClick={() => {
                            updateService({
                                ...currentService,
                                state: "available"
                            }).then((res) => chooseService(res.service))
                        }}>Kich hoạt</Button>}
                        {currentService.state === "available" && <Button color={"red"} onClick={() => {
                            updateService({
                                ...currentService,
                                state: "unavailable"
                            }).then((res) => chooseService(res.service))
                        }}>Dừng hoạt động</Button>}
                    </div>
                </div>}
        </div>
    </Tab.Pane>
}
const TabMenu = () => {
    const menus = useSelector(menuSelector);
    const dishes = useSelector(dishSelector);
    const groups = useSelector(groupsSelector);
    const [newMenu, setNewMenu] = useState(initMenu);
    const [openModal, setOpenModal] = useState(false)

    const [formErr, setErr] = useState({
        error: true,
        nameErr: true,
        errMsg: "Điền tên menu !",
    })

    const [confirmModal, setOpenConfirm] = useState({state: false, menuId: ""})

    const [activeIndex, setActiveIndex] = useState(-1);

    const formErrValidate = formErr.nameErr
    const formValidate = () => {
        if (!formErr.error) {
            if (editMode) {
                updateMenu({...newMenu}).then((res) => {
                    if (res.success) {
                        setOpenModal(false);
                        chooseMenu(res.menu)
                    }
                })
            } else {
                addMenu({...newMenu}).then((res) => {
                    if (res.success) {
                        setOpenModal(false);
                        chooseMenu(res.menu)
                    }
                })
            }
            chooseMenu(initMenu)
        } else toast.error(formErr.errMsg);
    }

    const [currentMenu, chooseMenu] = useState((menus.length > 0) ? menus[0] : initMenu);
    const [editMode, setEditMode] = useState(false)

    return <Tab.Pane>
        <Transition visible={confirmModal.state} animation='scale' duration={200}>
            <Modal dimmer="blurring" size={"tiny"} open={confirmModal.state}
                   onClose={() => setOpenConfirm({state: false, menuId: ""})}>
                <Modal.Header>Xóa menu ?</Modal.Header>
                <Modal.Content>Menu sẽ được xóa !?</Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpenConfirm({state: false, menuId: ""})}>Không</Button>
                    <Button positive onClick={() => {
                        deleteMenu(confirmModal.menuId).then(r => {
                                chooseMenu(initMenu);
                                setOpenConfirm({state: false, menuId: ""})
                            }
                        )
                    }}>Xóa</Button>
                </Modal.Actions>
            </Modal>
        </Transition>
        {openModal && <CustomModal showHandler={setOpenModal}>
            <h2 className="font-semibold mb-4">{editMode ? "Sửa thông tin" : "Thêm menu mới"}</h2>
            <div>
                <div className="flex flex-col gap-2 mb-4 required field">
                    <label>Tên menu*</label>
                    <Input value={newMenu.name} required error={formErr.nameErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            nameErr: false
                        } : {...prevState, error: true, nameErr: true}))
                        setNewMenu((prev: any) => {
                            return {
                                ...
                                    prev, name: e.target.value
                            }
                        })
                    }} type="text"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Giá toàn bộ menu</label>
                    <Input disabled value={newMenu.price} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Các món Soup</label>
                    <Dropdown
                        value={newMenu.soup?.map(item => item._id || null)}
                        onChange={
                            (e, data) => {
                                setNewMenu((prev: any) => {
                                    const temp = data?.value || "";
                                    // @ts-ignore
                                    const dishesMap = dishes.filter((dish: IDish) => temp.includes(dish._id))
                                    return {...prev, soup: dishesMap, price: menuTotal({...prev, soup: dishesMap})};
                                })
                            }}
                        placeholder="Chọn các món soup" options={menuGetAdapterGroup(groups.soup)} selection multiple
                        fluid/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Các món Salad</label>
                    <Dropdown
                        value={newMenu.salad?.map(item => item._id || null)}
                        onChange={
                            (e, data) => {
                                setNewMenu((prev: any) => {
                                    const temp = data?.value || "";
                                    // @ts-ignore
                                    const dishesMap = dishes.filter((dish: IDish) => temp.includes(dish._id))
                                    return {...prev, salad: dishesMap, price: menuTotal({...prev, salad: dishesMap})};
                                })
                            }}
                        placeholder="Chọn các món Salad" options={menuGetAdapterGroup(groups.salad)} selection multiple
                        fluid/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Các món chính</label>
                    <Dropdown
                        value={newMenu.main?.map(item => item._id || null)}
                        onChange={
                            (e, data) => {
                                setNewMenu((prev: any) => {
                                    const temp = data?.value || "";
                                    // @ts-ignore
                                    const dishesMap = dishes.filter((dish: IDish) => temp.includes(dish._id))
                                    return {...prev, main: dishesMap, price: menuTotal({...prev, main: dishesMap})};
                                })
                            }}
                        placeholder="Chọn các món chính" options={menuGetAdapterGroup(groups.main)} selection multiple
                        fluid/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Các món tráng miệng</label>
                    <Dropdown
                        value={newMenu.dessert?.map(item => item._id || null)}
                        onChange={
                            (e, data) => {
                                setNewMenu((prev: any) => {
                                    const temp = data?.value || "";
                                    // @ts-ignore
                                    const dishesMap = dishes.filter((dish: IDish) => temp.includes(dish._id))
                                    console.log(dishesMap)
                                    return {
                                        ...prev,
                                        dessert: dishesMap,
                                        price: menuTotal({...prev, dessert: dishesMap})
                                    };
                                })
                            }}
                        placeholder="Chọn các món tráng miệng" options={menuGetAdapterGroup(groups.dessert)} selection
                        multiple fluid/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Các món khác</label>
                    <Dropdown
                        value={newMenu.other?.map(item => item._id || null)}
                        onChange={
                            (e, data) => {
                                setNewMenu((prev: any) => {
                                    const temp = data?.value || "";
                                    // @ts-ignore
                                    const dishesMap = dishes.filter((dish: IDish) => temp.includes(dish._id))
                                    return {...prev, other: dishesMap, price: menuTotal({...prev, other: dishesMap})};
                                })
                            }}
                        placeholder="Chọn các món khác" options={menuGetAdapterGroup(groups.other)} selection multiple
                        fluid/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Mô tả</label>
                    <Input value={newMenu.description || ""} onChange={(e) => setNewMenu((prev) => {
                        return {
                            ...
                                prev, description: e.target.value
                        }
                    })} type="text"/>
                </div>
                <div className="flex w-full gap-4 justify-end">
                    <Button onClick={(e) => {
                        setOpenModal(false)
                    }}>Hủy</Button>
                    <Button onClick={(e) => {
                        formValidate()
                    }} primary>{editMode ? "Sửa" : "Thêm mới"}</Button>
                </div>
            </div>
        </CustomModal>}
        <h1 className="text-2xl font-bold mt-0">Các menus</h1>
        <p className="mb-6">Hiện có : {menus.length} menu</p>
        <div onClick={() => {
            setEditMode(false)
            setNewMenu(initMenu);
            setErr({
                error: true,
                nameErr: true,
                errMsg: "Điền tên menu !"
            })
            setOpenModal(true)
        }}
             className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer">
            <BsPlus/> Thêm Menu mới
        </div>

        <div className="flex flex-row gap-10 w-full h-[70vh]">
            <div className="h-full basis-2/3 overflow-y-scroll">
                <table className="w-full table-auto h-fit border-collapse relative">
                    <thead>
                    <tr>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white max-w-[100px] break-all whitespace-nowrap text-left">Mã
                            Menu
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Tên
                            Menu
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Giá
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Trạng
                            thái
                        </th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {
                        menus.map(((menu: IMenu, i: number) => {
                            return (
                                <tr onClick={() => {
                                    chooseMenu(menu)
                                }} key={`Menu${i}`}
                                    className={`hover:bg-cyan-200  transition-colors cursor-pointer ${menu._id === currentMenu._id ? "bg-cyan-200" : ""}`}>
                                    <td className="py-4 px-2 max-w-[100px] break-all font-semibold">{menu._id}</td>
                                    <td className="py-4 px-2">{menu.name}</td>
                                    <td className="py-4 px-2">{menu.price}</td>
                                    <td className="py-4 px-2"><StateConvert state={menu.state}/></td>
                                </tr>
                            )
                        }))
                    }
                    </tbody>
                </table>
            </div>
            {!currentMenu?.init &&
                <div className="basis-1/3 h-full overflow-y-scroll pl-2 pr-6 overflow-y-scroll pl-2 pr-6">
                    <h3 className="text-xl font-semibold">Chi tiết</h3>
                    <h4 className="text-lg mt-0 font-semibold">Menu {currentMenu.name}</h4>
                    <p className="text-lg font-semibold">#{currentMenu._id}</p>
                    <p><b>Trạng thái</b> : <StateConvert state={currentMenu.state || "unavailable"}/></p>
                    <p><b>Giá menu</b> : {currentMenu.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</p>
                    <p><b>Mô tả</b> : {currentMenu.description || ""}</p>
                    <p><b>Danh sách món ăn :</b></p>
                    <div className="mb-8">
                        <Accordion fluid styled>
                            {currentMenu.soup?.length > 0 && <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={() => setActiveIndex((prev) => prev === 0 ? -1 : 0)}
                            >
                                <Icon name='dropdown'/>
                                Món Soup
                            </Accordion.Title>}
                            {currentMenu.soup?.length > 0 && <Accordion.Content active={activeIndex === 0}>
                                <Label.Group color="blue">
                                    {currentMenu.soup?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                            {currentMenu.salad?.length > 0 && <Accordion.Title
                                active={activeIndex === 1}
                                index={1}
                                onClick={() => setActiveIndex((prev) => prev === 1 ? -1 : 1)}
                            >
                                <Icon name='dropdown'/>
                                Món Salad
                            </Accordion.Title>}
                            {currentMenu.salad?.length > 0 && <Accordion.Content active={activeIndex === 1}>
                                <Label.Group color="blue">
                                    {currentMenu.salad?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                            {currentMenu.main?.length > 0 && <Accordion.Title
                                active={activeIndex === 2}
                                index={2}
                                onClick={() => setActiveIndex((prev) => prev === 2 ? -1 : 2)}
                            >
                                <Icon name='dropdown'/>
                                Món chính
                            </Accordion.Title>}
                            {currentMenu.main?.length > 0 && <Accordion.Content active={activeIndex === 2}>
                                <Label.Group color="blue">
                                    {currentMenu.main?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                            {currentMenu.dessert?.length > 0 && <Accordion.Title
                                active={activeIndex === 3}
                                index={3}
                                onClick={() => setActiveIndex((prev) => prev === 3 ? -1 : 3)}
                            >
                                <Icon name='dropdown'/>
                                Món tráng miệng
                            </Accordion.Title>}
                            {currentMenu.dessert?.length > 0 && <Accordion.Content active={activeIndex === 3}>
                                <Label.Group color="blue">
                                    {currentMenu.dessert?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                            {currentMenu.other?.length > 0 && <Accordion.Title
                                active={activeIndex === 4}
                                index={4}
                                onClick={() => setActiveIndex((prev) => prev === 4 ? -1 : 4)}
                            >
                                <Icon name='dropdown'/>
                                Món khác
                            </Accordion.Title>}
                            {currentMenu.other?.length > 0 && <Accordion.Content active={activeIndex === 4}>
                                <Label.Group color="blue">
                                    {currentMenu.other?.map((item: any) => <Label>{item.name}</Label>)}
                                </Label.Group>
                            </Accordion.Content>}
                        </Accordion>
                    </div>
                    <p><b>Thao tác:</b></p>
                    <div className="flex flex-row gap-2">
                        <Button primary onClick={() => {
                            setEditMode(true);
                            setNewMenu(currentMenu);
                            setErr((prev: any) => ({
                                ...prev,
                                error: false,
                                nameErr: false
                            }))
                            setOpenModal(true)
                        }}>Sửa</Button>
                        <Button onClick={() => setOpenConfirm({state: true, menuId: currentMenu._id})}
                                color="red">Xóa</Button>
                        {currentMenu.state === "unavailable" && <Button color={"green"} onClick={() => {
                            updateMenu({
                                ...currentMenu,
                                state: "available"
                            }).then((res) => chooseMenu(res.menu))
                        }}>Kich hoạt</Button>}
                        {currentMenu.state === "available" && <Button color={"red"} onClick={() => {
                            updateMenu({
                                ...currentMenu,
                                state: "unavailable"
                            }).then((res) => chooseMenu(res.menu))
                        }}>Dừng hoạt động</Button>}
                    </div>
                </div>}
        </div>
    </Tab.Pane>
}
const TabDish = () => {
    const dishes = useSelector(dishSelector);
    const [newDish, setNewDish] = useState(initDish);
    const [openModal, setOpenModal] = useState(false)
    const [formErr, setErr] = useState({
        error: true,
        nameErr: true,
        priceErr: true,
        errMsg: "Điền đầy đủ các trường thông tin !",
    })

    const [confirmModal, setOpenConfirm] = useState({state: false, dishId: ""})

    const formErrValidate = formErr.nameErr || formErr.priceErr

    const formValidate = () => {
        if (!formErr.error) {
            if (editMode) {
                updateDish({...newDish}).then((res) => {
                    if (res.success) {
                        setOpenModal(false);
                        chooseDish(res.dish)
                    }
                })
            } else {
                addDish({...newDish}).then((res) => {
                    if (res.success) {
                        setOpenModal(false);
                        chooseDish(res.dish)
                    }
                })
            }

        } else toast.error(formErr.errMsg);
    }

    const [currentDish, chooseDish] = useState((dishes?.length > 0) ? dishes[0] : initDish);
    const [editMode, setEditMode] = useState(false)

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return <Tab.Pane>
        <Transition visible={confirmModal.state} animation='scale' duration={200}>
            <Modal dimmer="blurring" size={"tiny"} open={confirmModal.state}
                   onClose={() => setOpenConfirm({state: false, dishId: ""})}>
                <Modal.Header>Xóa dịch vụ ?</Modal.Header>
                <Modal.Content>Dịch vụ sẽ được xóa !?</Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpenConfirm({state: false, dishId: ""})}>Không</Button>
                    <Button positive onClick={() => {
                        deleteDish(confirmModal.dishId).then(r => {
                                chooseDish(initDish);
                                setOpenConfirm({state: false, dishId: ""})
                            }
                        )
                    }}>Xóa</Button>
                </Modal.Actions>
            </Modal>
        </Transition>
        {openModal && <CustomModal showHandler={setOpenModal}>
            <h2 className="font-semibold mb-4">Thêm món ăn mới</h2>
            <div>
                <div className="flex flex-col gap-2 mb-4 required field">
                    <label>Tên món*</label>
                    <Input value={newDish.name} required error={formErr.nameErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            nameErr: false
                        } : {...prevState, error: true, nameErr: true}))
                        setNewDish((prev: any) => {
                            return {
                                ...
                                    prev, name: e.target.value
                            }
                        })
                    }} type="text"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Giá mỗi món ăn*</label>
                    <Input value={newDish.price} required error={formErr.priceErr} onChange={(e) => {
                        setErr(prevState => (e.target.value.length !== 0 ? {
                            ...prevState,
                            error: formErrValidate,
                            priceErr: false
                        } : {...prevState, error: true, priceErr: true}))
                        setNewDish((prev: any) => {
                            return {
                                ...
                                    prev, price: parseFloat(e.target.value)
                            }
                        })
                    }} type="number"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Trình tự trong thực đơn*</label>
                    <Dropdown
                        value={newDish.order}
                        onChange={
                            (e, data) => {
                                setNewDish((prev: any) => {
                                    return {...prev, order: data.value};
                                })
                            }}
                        placeholder="Trình tự món ăn trong thực đơn" options={dishOrderAdapter} selection fluid/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Loại món ăn*</label>
                    <Dropdown
                        value={newDish.type}
                        onChange={
                            (e, data) => {
                                setNewDish((prev: any) => {
                                    return {...prev, type: data.value};
                                })
                            }}
                        placeholder="Chọn loại món ăn" options={dishTypeAdapter} selection fluid/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label>Mô tả</label>
                    <Input value={newDish.description || ""} onChange={(e) => setNewDish((prev: IDish) => {
                        return {
                            ...
                                prev, description: e.target.value
                        }
                    })} type="text"/>
                </div>
                <div className="flex w-full gap-4 justify-end">
                    <Button onClick={() => {
                        setOpenModal(false)
                    }}>Hủy</Button>
                    <Button onClick={(e) => {
                        formValidate()
                    }} primary>{editMode ? "Sửa" : "Thêm mới"}</Button>
                </div>
            </div>
        </CustomModal>}
        <h1 className="text-2xl font-bold mt-0">Các món ăn</h1>
        <p className="mb-6">Hiện có : {dishes.length} món ăn</p>
        <div onClick={() => {
            setEditMode(false)
            setNewDish(initDish);
            setErr({
                error: true,
                nameErr: true,
                priceErr: true,
                errMsg: "Điền đầy đủ các trường thông tin !",
            })
            setOpenModal(true)
        }}
             className="flex items-center absolute right-6 top-6 bg-cyan-200 p-2 rounded-md hover:bg-cyan-500 hover:text-white transition-all cursor-pointer">
            <BsPlus/> Thêm món mới
        </div>

        <div className="flex flex-row gap-10 w-full h-[70vh]">
            <div className="h-full basis-2/3 overflow-y-scroll">
                <table className="w-full table-auto h-fit border-collapse relative">
                    <thead>
                    <tr>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white max-w-[100px] break-all whitespace-nowrap text-left">Mã
                            món ăn
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Tên
                            món ăn
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Loại
                            món ăn
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Thứ
                            tự
                        </th>
                        <th className="px-2 py-4 border-slate-500 bg-slate-400 text-white whitespace-nowrap text-left">Trạng
                            thái
                        </th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {
                        dishes.map(((dish: IDish, i: number) => {
                            return (
                                <tr onClick={() => {
                                    chooseDish(dish)
                                }} key={`Dish${i}`}
                                    className={`hover:bg-cyan-200  transition-colors cursor-pointer ${dish._id === currentDish._id ? "bg-cyan-200" : ""}`}>
                                    <td className="py-4 px-2 max-w-[100px] break-all font-semibold">{dish._id}</td>
                                    <td className="py-4 px-2">{dish.name}</td>
                                    <td className="py-4 px-2">{dish.type}</td>
                                    <td className="py-4 px-2">{dish.order}</td>
                                    <td className="py-4 px-2"><StateConvert state={dish.state}/></td>
                                </tr>
                            )
                        }))
                    }
                    </tbody>
                </table>
            </div>
            {!currentDish?.init &&
                <div className="basis-1/3 h-full overflow-y-scroll pl-2 pr-6 overflow-y-scroll pl-2 pr-6">
                    <h3 className="text-xl font-semibold">Chi tiết</h3>
                    <h4 className="text-lg mt-0 font-semibold">Món {currentDish.name}</h4>
                    <p className="text-lg font-semibold">#{currentDish._id}</p>
                    <p><b>Trạng thái</b> : <StateConvert state={currentDish.state || "unavailable"}/></p>
                    <p><b>Loại món ăn</b> : {currentDish.type}</p>
                    <p><b>Đơn giá món ăn</b> : {currentDish.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                    </p>
                    <p><b>Thứ tự món trong thực đơn</b> : {currentDish.order}</p>
                    <p><b>Mô tả</b> : {currentDish.description || ""}</p>
                    <p><b>Thao tác:</b></p>
                    <div className="flex flex-row gap-2">
                        <Button primary onClick={() => {
                            setEditMode(true);
                            setNewDish(currentDish);
                            setErr({
                                error: false,
                                nameErr: false,
                                priceErr: false,
                                errMsg: "Điền đầy đủ các trường thông tin !",
                            });
                            setOpenModal(true);
                        }}>Sửa</Button>
                        <Button onClick={() => setOpenConfirm({state: true, dishId: currentDish._id})}
                                color="red">Xóa</Button>
                        {currentDish.state === "unavailable" && <Button color={"green"} onClick={() => {
                            updateDish({
                                ...currentDish,
                                state: "available"
                            }).then((res) => chooseDish(res.dish))
                        }}>Kich hoạt</Button>}
                        {currentDish.state === "available" && <Button color={"red"} onClick={() => {
                            updateDish({
                                ...currentDish,
                                state: "unavailable"
                            }).then((res) => chooseDish(res.dish))
                        }}>Dừng hoạt động</Button>}
                    </div>
                </div>}
        </div>
    </Tab.Pane>
}

const DataUpdate = () => {

    useEffect(() => {
        getAllLounge();
        getAllService();
        getAllDishes();
        getAllMenu()
    })

    const panes = [
        {menuItem: 'Sảnh cưới', render: () => <TabLounge/>},
        {menuItem: 'Menu', render: () => <TabMenu/>},
        {menuItem: 'Món ăn', render: () => <TabDish/>},
        {menuItem: 'Dịch vụ', render: () => <TabService/>},
    ]
    return (
        <div>
            <Tab onTabChange={() => {
                getAllLounge();
                getAllService();
                getAllDishes();
                getAllMenu()
            }} panes={panes}/>
        </div>
    );
};

export default DataUpdate;