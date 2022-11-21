import React from 'react';
import styles from './styles.module.scss';
import img from '../../asset/imgGetter'
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()

    return (
        <div className={styles.page + " flex"}>
            {/*Register section*/}
            <div className={styles.loginContainer + " flex justify-center"}>
                <h1 className={styles.title}>Xin chào, <br/>Chuẩn bị đám cưới sao ?</h1>
                <form>
                    <h2 className={styles.h2}>Đăng ký tài khoản khách</h2>
                    <fieldset className={styles.inputSection}>
                        <label>
                            Email
                        </label><br/>
                        <input className={styles.input} type="text" placeholder="Nhập email"></input>
                    </fieldset>
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
                    <fieldset className={styles.inputSection}>
                        <label>
                            Nhập lại mật khẩu
                        </label><br/>
                        <input className={styles.input} type="password" placeholder="Nhập lại password"></input>
                    </fieldset>

                    <button>Đăng ký</button>
                </form>

                <div className={styles.footer}>
                    Đã có tài khoản ? <button className="ml-1 btn-outline" onClick={()=> navigate('../login', {replace : true})}> Đăng nhập ngay</button>
                </div>
            </div>
            <div className={styles.coverImg}>
                <img alt={"Nhà hàng tiệc cưới Asiana Plaza"} src={img.thumb.mainCover}/>
            </div>
        </div>
    );
}

export default Register;