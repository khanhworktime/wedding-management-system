import React, {useEffect, useState} from 'react';
import { BsArrowBarLeft } from "react-icons/bs";
import {Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from "../Dashboard";
import Report from "../Report";
import CustomerInfo from "../CustomerInfo";
import SaleDeal from "../BookingRecord";
import Contracts from "../Contracts";
import DataUpdate from "../Admin/Data";
import Promotion from "../Admin/Promotion";
import Logo from '../../assets/logo/asiana.svg'
import {useSelector, useDispatch} from "react-redux";
import {setPage, currentPageSellector} from "../../store/reducers/page"
import {checkToken} from "../../api/login";
import Users from "../Admin/Users";
import Assign from "../RealTime/Assign";
import Party from "../RealTime/Party";

const Page = () => {
    const dispatch = useDispatch();
    const activeClass = "cursor-pointer px-4 py-2 bg-indigo-800 text-white rounded-lg"
    const currentPage = useSelector(currentPageSellector)
    const navigate = useNavigate()

    useEffect(()=>{
        checkToken().then(r => {
            console.log(r)
            if (!r) navigate('/login', {replace: true})
        });
    }, [])

    return (
        <div className="bg-cyan-100 flex min-w-screen min-h-screen">
            {/*Navbar*/}
            <div className="w-[300px]"></div>
            <div className="p-8 fixed top-0 left-0 rounded-lg min-w-fit h-full bg-white z-[1000]">
                <img className="mb-8 w-full" src={Logo} alt={""}/>
                <ul className="text-indigo-800">
                    <li onClick={()=> {navigate("/");dispatch(setPage("dashboard"))}} className={currentPage === "dashboard" ? activeClass : "cursor-pointer px-4 py-2 hover:bg-indigo-50 rounded-lg"+ " transition-all"}>Trang chủ</li>
                    <li onClick={()=> {navigate("report");dispatch(setPage("report"))}} className={currentPage === "report" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-50 rounded-lg"+ " transition-all"}>Báo cáo</li>
                </ul>
                <p className="text-indigo-600 font-bold my-3">Khách hàng</p>
                <ul className="pl-4 border-l-2 border-indigo-100 text-indigo-900">
                    <li onClick={()=> {navigate("customers");dispatch(setPage("customers"))}} className={currentPage === "customers" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"+ " transition-all"}>Thông tin chung</li>
                    <li onClick={()=> {navigate("sale_deals");dispatch(setPage("sale_deals"))}} className={currentPage === "sale_deals" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"+ " transition-all"}>Đơn đặt tiệc</li>
                    <li onClick={()=> {navigate("contracts");dispatch(setPage("contracts"))}} className={currentPage === "contracts" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"+ " transition-all"}>Hợp đồng tiệc</li>
                </ul>
                <p className="text-indigo-600 font-bold my-3">Quản lí thời gian thực</p>
                <ul className="pl-4 border-l-2 border-indigo-100 text-indigo-900">
                    <li onClick={()=> {navigate("party");dispatch(setPage("party"))}} className={currentPage === "party" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"+ " transition-all"}>Tiệc cưới</li>
                    <li onClick={()=> {navigate("assign");dispatch(setPage("assign"))}} className={currentPage === "assign" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"+ " transition-all"}>Phân công</li>
                </ul>
                <p className="text-indigo-600 font-bold my-3">ADMIN</p>
                <ul className="pl-4 border-l-2 border-indigo-100 text-indigo-900">
                    <li onClick={()=> {navigate("data_update");dispatch(setPage("data_update"))}} className={currentPage === "data_update" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"+ " transition-all"}>Cập nhật thông tin</li>
                    <li onClick={()=> {navigate("promotion");dispatch(setPage("promotion"))}} className={currentPage === "promotion" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"+ " transition-all"}>Khuyến mãi</li>
                    <li onClick={()=> {navigate("users");dispatch(setPage("users"))}} className={currentPage === "users" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"+ " transition-all"}>Quản lí tài khoản</li>
                </ul>
                <div onClick={()=>{
                    localStorage.removeItem("accessToken");
                    navigate("/login", {replace: true})
                }} className="cursor-pointer px-4 py-2 hover:bg-indigo-50 rounded-lg absolute bottom-2 left-2"><BsArrowBarLeft/>Logout</div>
            </div>

        {/* Page content */}
            <div className="p-8 flex-grow w-full overflow-scroll">
                <Routes>
                    <Route path="" element={<Dashboard/>}/>
                    <Route path="report" element={<Report/>}/>
                    <Route path="customers" element={<CustomerInfo/>}/>
                    <Route path="sale_deals" element={<SaleDeal/>}/>
                    <Route path="contracts" element={<Contracts/>}/>
                    <Route path="data_update" element={<DataUpdate/>}/>
                    <Route path="promotion" element={<Promotion/>}/>
                    <Route path="users" element={<Users/>}/>
                    <Route path="assign" element={<Assign/>}/>
                    <Route path="party" element={<Party/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Page;