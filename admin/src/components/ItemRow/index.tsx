import React from 'react';
import style from './item.module.scss'

type propType = {
    title: string,
    desc?: string,
    status: "cancel" | "complete" | "pending" | "progress" | "default",
    clickHandler?: any
}

const ItemRow = (props:propType) => {
    const { title, desc, status, clickHandler } = props
    return (
        <div onClick={()=> clickHandler()} className={style.itemRow}>
            <div className={`${style.status} ${style[status]}`}></div>
            <div className={style.content}>
                <h3 className="inline-block font-semibold">{title}</h3>
                <p className="w-full text-ellipsis">{desc}</p>
            </div>
        </div>
    );
};

export default ItemRow;