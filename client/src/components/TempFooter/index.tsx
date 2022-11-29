import React from 'react';
import styles from './styles.module.scss'
import {icon} from "../../asset/imgGetter";

const TempFooter = () => {
    return (
        <footer onClick={()=> window.scrollTo({top:0, behavior:"smooth"})} className={styles.footer}>
            <img src={icon.arrowUp} alt={"Up"}/>
            <em>Trở về đầu trang</em>
            <h1>Thông tin khác sẽ sớm được cập nhật</h1>
            <h1>More information will be coming soon</h1>
        </footer>
    );
};

export default TempFooter;