import React from 'react';
import buttonStyle from './button.module.scss'

type btnProps={
    icon?: string;
    state?: "borderless" | "outline" | "default";
    onClick?: EventListener;
    className?: string;
    backgroundColor?: string;
    children?: string;
}

const ButtonIcon = (props:btnProps) => {

    let {icon, children, state, onClick, className, backgroundColor} = props;
    state = state === undefined ? "default" : state;
    backgroundColor = !backgroundColor ? "#8CBDD2" : backgroundColor
    // @ts-ignore
    return (
        <button style={{backgroundColor: backgroundColor}} className={className + " " + buttonStyle.customButton +" " + buttonStyle[state]} onClick={()=>onClick}>
            {children}
            {icon && <img src={icon} alt={""}/>}
        </button>
    );
};

export default ButtonIcon;