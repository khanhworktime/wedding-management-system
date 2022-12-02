import React, {useEffect, useState} from 'react';
import { BsArrowBarLeft } from "react-icons/bs";
import {Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from "../Dashboard";
import Campaign from "../Campaign";
import Report from "../Report";
import CustomerInfo from "../CustomerInfo";
import SaleDeal from "../SaleDeal";
import Contracts from "../Contracts";
import DataUpdate from "../Admin/Data";
import Promotion from "../Admin/Promotion";

const Page = () => {

    const activeClass = "cursor-pointer px-4 py-2 bg-indigo-800 text-white rounded-lg"
    const [currentPage, setPage] = useState("dashboard");
    const navigate = useNavigate()

    return (
        <div className="bg-cyan-100 flex w-screen h-screen">
            {/*Navbar*/}
            <div className="p-8 rounded-lg max-w-fit h-full bg-white relative">
                <ul className="text-indigo-800">
                    <li onClick={()=> {navigate("/");setPage("dashboard")}} className={currentPage === "dashboard" ? activeClass : "cursor-pointer px-4 py-2 hover:bg-indigo-50 rounded-lg"}>Dashboard</li>
                    <li onClick={()=> {navigate("campaign");setPage("campaign")}} className={currentPage === "campaign" ? activeClass : "cursor-pointer px-4 py-2 hover:bg-indigo-50 rounded-lg"}>Campaign</li>
                    <li onClick={()=> {navigate("report");setPage("report")}} className={currentPage === "report" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-50 rounded-lg"}>Report</li>
                </ul>

                <p className="text-indigo-600 font-bold my-3">Customers</p>
                <ul className="pl-4 border-l-2 border-indigo-100 text-indigo-900">
                    <li onClick={()=> {navigate("customers");setPage("customers")}} className={currentPage === "customers" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"}>Information</li>
                    <li onClick={()=> {navigate("sale_deals");setPage("sale_deals")}} className={currentPage === "sale_deals" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"}>Sale deals</li>
                    <li onClick={()=> {navigate("contracts");setPage("contracts")}} className={currentPage === "contracts" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"}>Contracts</li>
                </ul>
                <p className="text-indigo-600 font-bold my-3">ADMIN</p>
                <ul className="pl-4 border-l-2 border-indigo-100 text-indigo-900">
                    <li onClick={()=> {navigate("data_update");setPage("data_update")}} className={currentPage === "data_update" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"}>Data update</li>
                    <li onClick={()=> {navigate("promotion");setPage("promotion")}} className={currentPage === "promotion" ? activeClass :"cursor-pointer px-4 py-2 hover:bg-indigo-900  hover:text-white rounded-lg"}>Promotions</li>

                </ul>
                <div onClick={()=>navigate("/login", {replace: true})} className="cursor-pointer px-4 py-2 hover:bg-indigo-50 rounded-lg absolute bottom-2 left-2"><BsArrowBarLeft/>Logout</div>
            </div>

        {/* Page content */}
            <div className="p-8">
                <Routes>
                    <Route index={true} element={<Dashboard/>}/>
                    <Route path="campaign" element={<Campaign/>}/>
                    <Route path="report" element={<Report/>}/>
                    <Route path="customers" element={<CustomerInfo/>}/>
                    <Route path="sale_deals" element={<SaleDeal/>}/>
                    <Route path="contracts" element={<Contracts/>}/>
                    <Route path="data_update" element={<DataUpdate/>}/>
                    <Route path="promotion" element={<Promotion/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Page;