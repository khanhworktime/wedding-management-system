import React, {useLayoutEffect} from 'react';
import store from "../../store";
import {setPage} from "../../store/reducers/page";

const Report = () => {

    useLayoutEffect(()=>{
        store.dispatch(setPage("report"))
    })

    return (
        <div>
            Reports
        </div>
    );
};

export default Report;