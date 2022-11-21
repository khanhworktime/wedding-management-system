import React from 'react';
import styles from './styles.module.scss'
import {logo, icon, thumb} from "../../asset/imgGetter";
import {Link} from "react-router-dom";
import ButtonIcon from "../../components/ButtonIcon";
import TempFooter from "../../components/TempFooter";

function Mainpage() {
    return (
        <div className={styles.page}>
            <nav className={styles.nav}>
                <div className={styles.brand}>
                    <img src={logo.asiana} alt={"Asiana Plaza"}/>
                </div>
                <ul className={styles.navItems}>
                    <li className={styles.item}><Link to={""}>Giới thiệu</Link></li>
                    <li className={styles.item}><Link to={""}>Đặt tiệc ngay</Link></li>
                    <li className={styles.item}><Link to={""}>Sảnh</Link></li>
                    <li className={styles.item}><Link to={""}>Menu</Link></li>
                    <li className={styles.item}><Link to={""}>Dịch vụ</Link></li>
                    <li className={styles.item}><Link to={""}>Liên hệ</Link></li>
                </ul>
                <div className={styles.navFunciton}>
                    <button className="btn-borderless mr-2">Đăng nhập</button>
                    <button>Đăng kí</button>
                </div>
            </nav>

            <div className={styles.pageSection}>
                <section className="mb-20 flex justify-between items-center" >
                    <header className={styles.header}>
                        <p className={styles.em}>Hãy để chúng tôi</p>
                        <h1>Tổ chức một tiệc cưới tuyệt vời cho bạn </h1>
                    </header>
                    <article className={styles.description}>
                        <p className="mb-4">Với kinh nghiệm phong phú trong tổ chức và vận hành tiệc cưới, chúng tôi cam kết mang lại cho bạn những sự lựa chọn phù hợp nhất. Để ngày cưới là ngày nhớ mãi trong đời. </p>
                        <ButtonIcon icon={icon.arrowForward}>Đặt tiệc ngay</ButtonIcon>
                    </article>
                </section>
                <section className={"w-full mb-16 " + styles.cover}>
                    <img src={thumb.homeCover} alt={"Asiana Plaza"}/>
                </section>
                <section className={styles.intro}>
                    <header className="flex mb-10 justify-between items-center">
                        <h1>Đa dạng lựa chọn</h1>
                        <ButtonIcon icon={icon.arrowForward}>Tham khảo</ButtonIcon>
                    </header>
                    <article className="grid gap-10 grid-cols-4">
                        <div className="flex flex-col gap-4">
                            <img src={icon.wedding} alt={"Wedding lounge"}/>
                            <h1>Thiết kế sảnh cưới</h1>
                            <p>Đa dạng thiết kế sảnh cưới mang tới bầu không khí phù hợp với bất cứ chủ đề tiệc cưới nào mà bạn hướng tới</p>
                            <Link to=""/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={icon.menu} alt={"Wedding menu"}/>
                            <h1>Menu chất lượng</h1>
                            <p>Menu ở Asiana Plaza được định hình từ chất lượng thực tế. Với đa dạng số lượng món ăn và chủ đề, trải nghiệm món ăn ở Asiana Plaza sẽ cam kết khiến khách mời phải trầm trồ.</p>
                            <Link to=""/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={icon.drum} alt={"Wedding service"}/>
                            <h1>Dịch vụ cao cấp</h1>
                            <p>Từ bar đến buffet, từ âm thanh đến ánh sáng, tại Asiana Plaza, chúng tôi luôn hướng tới một trải nghiệm toàn vẹn và cao cấp nhất cho khách hàng.</p>
                            <Link to=""/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={icon.people} alt={"Wedding preception"}/>
                            <h1>Đội ngũ chuyên nghiệp</h1>
                            <p>Với kinh nghiệm tổ chức tiệc cưới trên 5 năm, đội ngũ nhân viên tại Asiana Plaza cam kết sẽ mang đến một trải nghiệm hoàn hảo và tuyệt vời </p>
                            <Link to=""/>
                        </div>
                    </article>
                </section>
            </div>
            <TempFooter/>
        </div>
    );
}

export default Mainpage;