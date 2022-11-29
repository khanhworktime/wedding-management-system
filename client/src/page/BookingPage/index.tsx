import styles from './styles.module.scss';
import {useState} from 'react';
import Navbar from '../../components/Navbar'
import Dropdown from '../../components/Dropdown'
import ILounge, {fakeLounges} from "../../interface/ILounge";
import {thumb} from "../../asset/imgGetter";
import TempFooter from "../../components/TempFooter";
import LoadingScreen from "../../components/LoadingScreen";
import BasicInformation from './BasicInformation';
import MenuSelector from './Menu';

function BookingPage() {
    const [waiting, setWaiting] = useState(false);
    const [step, setStep] = useState(0);
    // 0 : Basic information , 1: Menu selector
    const [bookingRecord, setBookingData] = useState({});

    return (
        <div className={styles.page}>
            <Navbar/>
            <div className="flex flex-row gap-10 justify-around mt-10">
                <div className="content">
                    <div className={styles.header}>
                        <p className={styles.em}>Đặt tiệc cưới</p>
                        <h1>Đặt tiệc cưới</h1>
                    </div>

                    {step == 0 && <BasicInformation setStep={setStep} setData={setBookingData}/>}
                    {step == 1 && <MenuSelector setStep={setStep} setData={setBookingData}/>}

                </div>
                <div className={styles.cover}>
                    <img src={thumb.bookingCover}/>
                </div>
            </div>
            <TempFooter/>
        </div>
    );
}

export default BookingPage;