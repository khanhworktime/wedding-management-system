import navbar from "./navbar.module.scss";
import {logo} from "../../asset/imgGetter";
import {Link} from "react-router-dom";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function Navbar(){

    const navigate = useNavigate()

    return <nav className={navbar.nav}>
        <div className={navbar.brand}>
            <img src={logo.asiana} alt={"Asiana Plaza"}/>
        </div>
        <ul className={navbar.navItems}>
            <li className={navbar.item}><Link to={""}>Giới thiệu</Link></li>
            <li className={navbar.item}><Link to={""}>Đặt tiệc ngay</Link></li>
            <li className={navbar.item}><Link to={""}>Sảnh</Link></li>
            <li className={navbar.item}><Link to={""}>Menu</Link></li>
            <li className={navbar.item}><Link to={""}>Dịch vụ</Link></li>
            <li className={navbar.item}><Link to={""}>Liên hệ</Link></li>
        </ul>
        <div className={navbar.navFunciton}>
            <button onClick={()=>navigate("/login")} className="btn-borderless mr-2">Đăng nhập</button>
            <button onClick={()=>navigate("/register")} >Đăng kí</button>
        </div>
    </nav>
};