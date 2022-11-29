import React, { useState } from 'react';
import styles from './styles.module.scss';
import img from '../../asset/imgGetter'
import { useNavigate } from "react-router-dom";
import login from '../../api/login'

function Login() {

    const navigate = useNavigate()
    const [account, setAccount] = useState({username: "", pwd: ""})

    return (
        <div className={styles.page + " flex"}>
            {/*Login section*/}
            <div className={styles.loginContainer + " flex justify-center"}>
                <h1 className={styles.title}>Xin chào, <br/>Đến giờ cưới rồi</h1>
                <form>
                    <h2 className={styles.h2}>Đăng nhập</h2>
                    <fieldset className={styles.inputSection}>
                        <label>
                            Tài khoản
                        </label><br/>
                        <input onChange={(e)=>setAccount((prev)=>{return {...prev, username: e.target.value}})} className={styles.input} type="text" placeholder="Nhập username"/>
                    </fieldset>
                    <fieldset className={styles.inputSection}>
                        <label>
                            Mật khẩu
                        </label><br/>
                        <input onChange={(e)=>setAccount((prev)=>{return {...prev, pwd: e.target.value}})} className={styles.input} type="password" placeholder="Nhập password"/>
                    </fieldset>

                    <button onClick={(e)=>{e.preventDefault(); login(account)}}>Đăng nhập</button>
                </form>

                <div className={styles.footer}>
                    Chưa có tài khoản ? <button className="ml-1 btn-outline" onClick={()=> navigate('../register', {replace : false})}> Đăng kí ngay</button>
                </div>
            </div>
            <div className={styles.coverImg}>
                <img alt={"Nhà hàng tiệc cưới Asiana Plaza"} src={img.thumb.mainCover}/>
            </div>
        </div>
    );
}

export default Login;