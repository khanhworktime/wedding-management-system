import mainThumb from './thumb/mainThumb.png'
import asianaLogo from './logo/asiana.svg'
import arrowRight from './icon/arrow_forward_24px.svg'
import homeThumb from './thumb/homeCover.png'
import drum from './icon/drum-set.svg'
import menu from './icon/menu.svg'
import wedding from './icon/wedding-arch.svg'
import people from './icon/people.svg'
import arrowUp from './icon/arrow_up_24px.svg'
import carretDown from './icon/caret-down.svg'
import bookingCover from './thumb/bookingCover.png'
import loading from './gif/loading.gif'

const  allImg = {
    thumb: {
        mainCover: mainThumb,
        homeCover: homeThumb,
        bookingCover
    },
    logo: {
        asiana: asianaLogo
    },
    icon: {
        arrowForward: arrowRight,
        drum, menu, wedding, people, arrowUp, carretDown
    },
    gif: {
        loading
    }
}

export default allImg;
export const logo = allImg.logo;
export const icon = allImg.icon;
export const thumb = allImg.thumb;
export const gif = allImg.gif;