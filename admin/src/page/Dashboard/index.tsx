import React from 'react';
import FakeChart from "../../components/Chart/fakeChart";
import {BsBarChartLine, BsListUl, BsPlusSquare} from "react-icons/bs"
import ItemRow from "../../components/ItemRow";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 w-full gap-6">
                <FakeChart/>
                <FakeChart/>
            </div>
            <div className="flex gap-6 w-full">
                <div className="w-full flex-grow">
                    <h2 className="font-semibold text-2xl mb-4">Phím tắt</h2>
                    <div className="w-full">
                        <div onClick={()=>navigate("/customers")} className="mb-8 hover:shadow-lg transition-all cursor-pointer p-6 rounded-md bg-white flex gap-4 items-center"><BsPlusSquare/> Thêm khách hàng mới</div>
                        <div className="mb-8 hover:shadow-lg transition-all cursor-pointer p-6 rounded-md bg-white flex gap-4 items-center"><BsPlusSquare/> Thêm tiệc cưới</div>
                        <div className="mb-8 hover:shadow-lg transition-all cursor-pointer p-6 rounded-md bg-white flex gap-4 items-center"><BsBarChartLine/> Tạo báo cáo</div>
                        <div className="mb-8 hover:shadow-lg transition-all cursor-pointer p-6 rounded-md bg-white flex gap-4 items-center"><BsListUl/> Xem danh sách tiệc</div>
                    </div>
                </div>
                <div className="w-fit flex flex-col gap-6">
                    <div className="w-fit p-6 bg-white whitespace-nowrap rounded-md">
                        <h2 className="font-semibold inline-block text-2xl mb-4">Danh sách tiệc đang được diễn ra</h2>
                        <div>
                            <ItemRow title="Testing" status="pending" desc="Testing" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;