import React from 'react';
import {BsX} from "react-icons/bs";

type propsType = {
    showHandler: any,
    children: any,
}

const Modal = (props:propsType) => {

    const {showHandler, children} = props

    return (
        <div className="absolute">
            <div onClick={()=>showHandler((prev:any)=>false)} className="fixed top-0 left-0 w-screen h-screen z-10 bg-black/[.15]"></div>
            <div className="fixed p-6 top-10 rounded-md my-0 z-20 min-w-[40vw] max-w-[40vw] min-h-[60vh] max-h-[90vh] overflow-scroll overflow-x-hidden bg-white">
                <div onClick={()=>showHandler((prev:any)=>false)} className="cursor-pointer p-1 bg-cyan-100 rounded-md absolute top-2 right-2"><BsX size={36}/></div>
                {children}
            </div>
        </div>
    );
};

export default Modal;