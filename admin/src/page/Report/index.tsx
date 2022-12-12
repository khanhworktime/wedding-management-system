import React, {useLayoutEffect} from 'react';
import store from "../../store";
import {setPage} from "../../store/reducers/page";
import {Input} from "semantic-ui-react";

const Report = () => {

    useLayoutEffect(()=>{
        store.dispatch(setPage("report"))
    })

    return (
        <div>
            <Input required error={true} />
        </div>
    );
};

export default Report;