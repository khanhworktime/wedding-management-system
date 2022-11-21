import React from 'react';
import styles from './styles.module.scss';
import img from '../../asset/imgGetter'
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

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
                        <input className={styles.input} type="text" placeholder="Nhập username"></input>
                    </fieldset>
                    <fieldset className={styles.inputSection}>
                        <label>
                            Mật khẩu
                        </label><br/>
                        <input className={styles.input} type="password" placeholder="Nhập password"></input>
                    </fieldset>

                    <button>Đăng nhập</button>
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