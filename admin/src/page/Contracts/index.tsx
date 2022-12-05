import React, {useLayoutEffect} from 'react';
import store from "../../store";
import {setPage} from "../../store/reducers/page";

const Contract = () => {
    useLayoutEffect(()=>{
        store.dispatch(setPage("contracts"))
    })
    return (
        <div>
            Contracts
        </div>
    );
};

export default Contract;